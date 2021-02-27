import React, { useContext } from 'react'
import { ALL_MESSAGES, GET_ALL_IDENTITIES } from '../../lib/graphql/queries'
import { FlatList } from 'react-native'
import { NavigationStackScreenProps } from 'react-navigation-stack'
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
} from '@kancha/kancha-ui'
import ContactsHeader from '../../navigators/components/ContactsHeader'
import { Colors } from '../../theme'
import { useQuery } from 'react-apollo'
import { AppContext } from '../../providers/AppContext'
import AppConstants from '../../constants'

interface Props extends NavigationStackScreenProps {}

const Activity: React.FC<Props> = ({ navigation }) => {
  const [selectedIdentity] = useContext(AppContext)
  const { data: allIdentities, loading: allIdentitiesLoading } = useQuery(
    GET_ALL_IDENTITIES,
  )
  const {
    data: allMessages,
    loading: allMessagesLoading,
    error: allMessagesError,
    refetch: refetchAllMessages,
  } = useQuery(ALL_MESSAGES, {
    variables: {
      selectedIdentity: selectedIdentity,
    },
  })

  const goToPerseidProfile = () => {
    navigation.navigate('Passport', {
      did: selectedIdentity,
      fetchMessages: refetchAllMessages,
    })
  }

  const showFirstLoadModal = () => {
    navigation.navigate('CreateFirstCredential', {
      did: selectedIdentity,
      fetchMessages: refetchAllMessages,
    })
  }

  const showDocumentImage = (assetId: String) => {
    navigation.navigate('ShowDocumentImage', {
      assetId: assetId,
      fetchMessages: refetchAllMessages,
    })
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
      isViewer: selectedIdentity === did,
    })
  }

  const confirmRequest = (msg: any) => {
    const requestType = AppConstants.requests.DISCLOSURE

    navigation.navigate('Requests', {
      requestType,
      peerId: null,
      peerMeta: null,
      payload: null,
      messageId: msg && msg.id,
    })
  }

  return (
    <Screen background={'primary'} safeArea={true}>
      <Container flex={1}>
        {allMessagesLoading && (
          <Loader width={180} text={'Loading activity...'} />
        )}
        {allMessagesError ? (
          <Text>Error</Text>
        ) : (
          <FlatList
            ListHeaderComponent={
              <ContactsHeader
                viewProfile={viewProfile}
                identities={allIdentities && allIdentities.identities}
              />
            }
            style={{ backgroundColor: Colors.LIGHTEST_GREY, flex: 1 }}
            data={allMessages && allMessages.messages && allMessages.messages}
            onRefresh={() => refetchAllMessages()}
            refreshing={allMessagesLoading || allIdentitiesLoading}
            renderItem={({ item }: { item: any }) => {
              return (
                <ActivityItem
                  id={item.id}
                  type={item.type}
                  date={item.saveDate}
                  sender={item.from}
                  receiver={item.to}
                  viewer={item.viewer}
                  confirm={() => confirmRequest(item)}
                  profileAction={() => {}}
                  actions={['Share']}
                  attachments={item.credentials}
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
                      <Credential
                        onPress={() =>
                          viewAttachments(item.credentials, credentialIndex)
                        }
                        exp={credential.expirationDate}
                        fields={credential.claims}
                        subject={credential.subject}
                        issuer={credential.issuer}
                        shadow={1.5}
                        background={'primary'}
                      />
                      <Button
                        fullWidth
                        buttonText={'View Document Image'}
                        onPress={() =>
                          showDocumentImage(
                            credential.credentialSubject.assetId,
                          )
                        } //credential.credentialSubject.assetId
                        type={Constants.BrandOptions.Primary}
                        block={Constants.ButtonBlocks.Outlined}
                      />
                    </Container>
                  )}
                />
              )
            }}
            keyExtractor={(item, index) => item.id + index}
            ListEmptyComponent={
              <Container>
                {!allMessagesLoading && (
                  <Container padding background={'secondary'}>
                    <Text bold type={Constants.TextTypes.H3}>
                      Hey there,
                    </Text>
                    <Container marginBottom marginTop={5}>
                      <Text type={Constants.TextTypes.Body}>
                        It looks like you are new here? You can start by issuing
                        yourself a<Text bold> passport </Text>
                        credential!
                      </Text>
                    </Container>
                    <Button
                      fullWidth
                      buttonText={'Get started'}
                      onPress={goToPerseidProfile}
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
