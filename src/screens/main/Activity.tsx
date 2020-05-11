import React, { useEffect } from 'react'
import {
  Container,
  Text,
  Screen,
  ActivityItem,
  Button,
  Device,
  Constants,
  Credential,
  Loader,
  Typings,
  Connection,
} from '@kancha/kancha-ui'
import { Colors } from '../../theme'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { useQuery, useLazyQuery } from 'react-apollo'
import { core, dataStore } from '../../lib/setup'
import {
  VIEWER_MESSAGES,
  GET_VIEWER,
  GET_ALL_IDENTITIES,
} from '../../lib/graphql/queries'
import { FlatList } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element'
import { ScrollView } from 'react-native-gesture-handler'

interface Identity {
  did: string
  shortId: string
  isSelected: boolean
  profileImage?: string
}

interface Props extends NavigationStackScreenProps {}

const Activity: React.FC<Props> = ({ navigation }) => {
  const viewerResponse = useQuery(GET_VIEWER)
  const identitiesResponse = useQuery(GET_ALL_IDENTITIES)
  const [getMessages, { loading, data, error }] = useLazyQuery(VIEWER_MESSAGES)

  //console.log(error)

  const fetchMessages = () => {
    if (viewerResponse && viewerResponse.data && viewerResponse.data.viewer) {
      getMessages({
        variables: {
          selectedDid: viewerResponse.data.viewer.did,
        },
      })
    }
  }

  const showFirstLoadModal = () => {
    if (viewerResponse && viewerResponse.data && viewerResponse.data.viewer) {
      navigation.navigate('CreateFirstCredential', {
        did: viewerResponse.data.viewer.did,
        fetchMessages,
      })
    }
  }

  const viewAttachments = (credentials: any[], credentialIndex: number) => {
    navigation.navigate('CredentialDetail', {
      credentials,
      credentialIndex,
    })
  }

  const viewProfile = (did: any) => {
    navigation.navigate('Profile', {
      did,
      isViewer: viewerResponse.data.viewer.did === did,
    })
  }

  const syncAndRefetch = async () => {
    await core.getMessagesSince(await dataStore.latestMessageTimestamps())

    fetchMessages()
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    identitiesResponse && identitiesResponse.refetch()
  }, [data])

  const confirmRequest = (msg: any) => {
    navigation.navigate('Request', {
      requestMessage: msg,
      viewerDid: data.viewer.did,
    })
  }

  const ContactsHeader = (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: Colors.WHITE, marginBottom: 1 }}
    >
      <Container flexDirection={'row'}>
        {identitiesResponse &&
          identitiesResponse.data &&
          identitiesResponse.data.identities &&
          identitiesResponse.data.identities
            .sort(
              (id1: Identity, id2: Identity) =>
                (id2.isSelected ? 1 : 0) - (id1.isSelected ? 1 : 0),
            )
            .map((identity: Typings.Identity & { isManaged: boolean }) => {
              return (
                <Connection
                  key={identity.did}
                  onPress={() => viewProfile(identity.did)}
                  shortId={identity.shortId}
                  did={identity.did}
                  profileImage={identity.profileImage}
                  isManaged={identity.isManaged}
                />
              )
            })}
      </Container>
    </ScrollView>
  )

  return (
    <Screen background={'secondary'} safeArea={true}>
      <Container flex={1}>
        {loading && <Loader width={180} text={'Loading activity...'} />}
        {error ? (
          <Text>Error</Text>
        ) : (
          <FlatList
            ListHeaderComponent={ContactsHeader}
            style={{ backgroundColor: Colors.LIGHTEST_GREY, flex: 1 }}
            data={data && data.viewer && data.viewer.messagesAll}
            onRefresh={syncAndRefetch}
            refreshing={loading || identitiesResponse.loading}
            renderItem={({ item }: { item: any }) => {
              return (
                <ActivityItem
                  id={item.id}
                  type={item.type}
                  profileAction={viewProfile}
                  date={item.timestamp * 1000}
                  viewer={viewerResponse && viewerResponse.data.viewer}
                  sender={item.sender}
                  receiver={item.receiver}
                  confirm={() => confirmRequest(item)}
                  attachments={item.vc}
                  renderAttachment={(
                    credential: any,
                    credentialIndex: number,
                  ) => (
                    <Container
                      w={Device.width - 40}
                      padding
                      paddingRight={0}
                      key={credential.hash}
                    >
                      <SharedElement id={credential.hash}>
                        <Credential
                          onPress={() =>
                            viewAttachments(item.vc, credentialIndex)
                          }
                          exp={credential.exp}
                          fields={credential.fields}
                          subject={credential.sub}
                          issuer={credential.iss}
                          shadow={1.5}
                          background={'primary'}
                        />
                      </SharedElement>
                    </Container>
                  )}
                  actions={['Share']}
                />
              )
            }}
            keyExtractor={(item, index) => item.id + index}
            ListEmptyComponent={
              <Container>
                {!loading && (
                  <Container padding background={'secondary'}>
                    <Text bold type={Constants.TextTypes.H3}>
                      Hey there,
                    </Text>
                    <Container marginBottom marginTop={5}>
                      <Text type={Constants.TextTypes.Body}>
                        It looks like you are new here? You can start by issuing
                        yourself a<Text bold> name </Text>
                        credential for the Bermuda Government
                      </Text>
                    </Container>
                    <Button
                      fullWidth
                      buttonText={'Get started'}
                      onPress={showFirstLoadModal}
                      type={Constants.BrandOptions.Primary}
                      block={Constants.ButtonBlocks.Outlined}
                    />
                  </Container>
                )}
                {[1, 2, 3, 4].map((fakeItem: number) => (
                  <Container
                    background={'primary'}
                    padding
                    marginBottom={5}
                    key={fakeItem}
                  >
                    <Container
                      background={'secondary'}
                      viewStyle={{ borderRadius: 20, width: 40, height: 40 }}
                    ></Container>
                    <Container
                      background={'secondary'}
                      h={90}
                      br={10}
                      marginTop={20}
                    ></Container>
                  </Container>
                ))}
              </Container>
            }
          />
        )}
      </Container>
    </Screen>
  )
}

export default Activity
