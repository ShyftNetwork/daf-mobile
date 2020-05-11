/**
 *
 */
import React, { useState } from 'react'
import { TextInput, ActivityIndicator } from 'react-native'
import {
  Container,
  Text,
  Screen,
  Constants,
  Button,
  Modal,
} from '@kancha/kancha-ui'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { useMutation } from '@apollo/react-hooks'
import { SEND_JWT_MUTATION, SIGN_VC_MUTATION } from '../../lib/graphql/queries'
import { core } from '../../lib/setup'
import { Message } from 'daf-core'

const CreateFirstCredential: React.FC<NavigationStackScreenProps> & {
  navigationOptions: any
} = ({ navigation }) => {
  //debug('CreateFirstCredential')
  const did = navigation.getParam('did')
  const fetchMessages = navigation.getParam('fetchMessages')
  const [name, setName] = useState()
  const [sending, setSending] = useState(false)

  const [actionSendJwt] = useMutation(SEND_JWT_MUTATION, {
    onCompleted: response => {
      if (response && response.actionSendJwt) {
        setSending(false)
        fetchMessages()
      }
      navigation.dismiss()
    },
  })
  const [actionSignVc] = useMutation(SIGN_VC_MUTATION, {
    onCompleted: async response => {
      if (response && response.actionSignVc) {
        setSending(true)
        await core.validateMessage(
          new Message({
            raw: response.actionSignVc,
            meta: {
              type: 'selfSigned',
            },
          }),
        )
        actionSendJwt({
          variables: {
            from: did,
            to: did,
            jwt: response.actionSignVc,
          },
        })
      }
    },
  })

  const signVc = () => {
    actionSignVc({
      variables: {
        did,
        data: {
          sub: did,
          vc: {
            context: ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential'],
            credentialSubject: {
              name,
            },
          },
        },
      },
    })
  }

  return (
    <Screen scrollEnabled background={'primary'}>
      <Container padding>
        <Text type={Constants.TextTypes.H3} bold>
          {'Issue Credential'}
        </Text>
        <Container marginTop={10}>
          <Text type={Constants.TextTypes.Body}>
            You are issuing a credential to youself
          </Text>
        </Container>

        <Container backgroundColor={'#D3F4DF'} padding br={5} marginTop>
          <Text textStyle={{ fontFamily: 'menlo' }}>{did}</Text>
        </Container>
        <Container marginTop marginBottom>
          {sending ? (
            <Container
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <ActivityIndicator />
              <Container marginLeft>
                <Text type={Constants.TextTypes.Body}>
                  Issuing your credential
                </Text>
              </Container>
            </Container>
          ) : (
            <Text type={Constants.TextTypes.Body}>
              Let's create your first credential by issuing a{' '}
              <Text textStyle={{ fontStyle: 'italic' }} bold>
                name
              </Text>{' '}
              credential to yourself...
            </Text>
          )}
        </Container>
        <Container marginTop marginBottom>
          <Text type={Constants.TextTypes.Body}>Enter your name</Text>
        </Container>
        <Container disabled={sending} background={'secondary'} padding br={5}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={'Name'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container marginTop={50}>
          <Container>
            <Button
              disabled={sending || !name}
              fullWidth
              block={Constants.ButtonBlocks.Filled}
              type={Constants.BrandOptions.Primary}
              buttonText={'Issue'}
              onPress={() => signVc()}
            />
          </Container>
        </Container>
      </Container>
    </Screen>
  )
}

CreateFirstCredential.navigationOptions = ({ navigation }: any) => {
  return {
    title: 'Issue credential',
    headerLeft: (
      <HeaderButtons>
        <Item title={'Cancel'} onPress={navigation.dismiss} />
      </HeaderButtons>
    ),
  }
}

export default CreateFirstCredential
