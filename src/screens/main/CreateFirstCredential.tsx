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
import { SIGN_VC_MUTATION, NEW_MESSAGE } from '../../lib/graphql/queries'

const CreateFirstCredential: React.FC<NavigationStackScreenProps> & {
  navigationOptions: any
} = ({ navigation }) => {
  const did = navigation.getParam('did')
  const fetchMessages = navigation.getParam('fetchMessages')
  const [name, setName] = useState()
  const [address, setAddress] = useState()
  const [country, setCountry] = useState()

  const [handleMessage] = useMutation(NEW_MESSAGE, {
    onCompleted: () => {
      fetchMessages()
      navigation.dismiss()
    },
  })

  const [actionSignVc] = useMutation(SIGN_VC_MUTATION, {
    onCompleted: async response => {
      if (response && response.signCredentialJwt) {
        handleMessage({
          variables: {
            raw: response.signCredentialJwt.raw,
            meta: [{ type: 'selfSigned' }],
          },
        })
      }
    },
  })

  const signVc = () => {
    actionSignVc({
      variables: {
        data: {
          issuer: did,
          context: ['https://www.w3.org/2018/credentials/v1'],
          type: ['VerifiableCredential'],
          credentialSubject: {
            id: did,
            name,
            address,
            country,
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
          <Text type={Constants.TextTypes.Body}>
            Let's create your first credential by issuing a{' '}
            <Text textStyle={{ fontStyle: 'italic' }} bold>
              name
            </Text>
            credential to yourself...
          </Text>
        </Container>
        <Container marginTop marginBottom>
          <Text type={Constants.TextTypes.Body}>Enter your name</Text>
        </Container>
        <Container background={'secondary'} padding br={5}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={'Name'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container marginTop marginBottom>
          <Text type={Constants.TextTypes.Body}>Enter your Address</Text>
        </Container>
        <Container background={'secondary'} padding br={5}>
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder={'Address'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container marginTop marginBottom>
          <Text type={Constants.TextTypes.Body}>Country</Text>
        </Container>
        <Container background={'secondary'} padding br={5}>
          <TextInput
            value={country}
            onChangeText={setCountry}
            placeholder={'Country'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container marginTop={50}>
          <Container>
            <Button
              disabled={!name}
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
