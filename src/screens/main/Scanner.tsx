/**
 * Serto Mobile App
 *
 */
import React, { useState, useContext } from 'react'
import { WalletConnectContext } from '../../providers/WalletConnect'
import { Container, FabButton, Screen } from '@kancha/kancha-ui'
import { RNCamera } from 'react-native-camera'
import { Colors, Icons } from '../../theme'
import { TextInput } from 'react-native-gesture-handler'
import { NEW_MESSAGE } from '../../lib/graphql/queries'
import { useMutation } from '@apollo/react-hooks'

export default (props: any) => {
  const [scannerActive, toggleScanner] = useState(true)
  const [inputMode, toggleInputMode] = useState(false)
  const { walletConnectOnSessionRequest } = useContext(WalletConnectContext)

  const [handleMessage] = useMutation(NEW_MESSAGE, {
    onCompleted(resp) {
      console.log('Success', resp)
    },
    onError(err) {
      if (err) {
        console.log('Error', err)
      }
    },
  })

  const onPasteJWT = (text: string) => {
    onBarCodeRead({ data: text })
  }

  const processDafMessage = async (message: string) => {
    const decodedMessage = await handleMessage({
      variables: {
        raw: message,
        metaData: [{ type: 'qrCode' }],
        save: false,
      },
    })

    const { type, credentials } = decodedMessage.data.handleMessage
    switch (type) {
      case 'w3c.vc':
        props.navigation.dismiss()

        setTimeout(() => {
          props.navigation.navigate('CredentialView', {
            message,
            credentials,
            handleMessage,
          })
        }, 300)

        return
      default:
        props.navigation.navigate('MessageProcess', {
          message,
        })
    }
  }

  const onBarCodeRead = (e: any) => {
    if (scannerActive) {
      if (e.data.startsWith('wc:')) {
        walletConnectOnSessionRequest(e.data)
        props.navigation.dismiss()
      } else {
        processDafMessage(e.data)
      }
    }

    toggleScanner(false)
  }

  return (
    <Screen
      fabButton={
        <Container marginBottom={-16} flexDirection={'row'}>
          <Container flex={1}></Container>
          <Container flex={1} alignItems={'center'}>
            <FabButton
              testID={'CANCEL_SCAN_BTN'}
              color={Colors.CHARCOAL}
              onPress={() => props.navigation.dismiss()}
              icon={Icons.CLOSE}
            />
          </Container>
          <Container flex={1} justifyContent={'flex-start'}>
            {__DEV__ && (
              <FabButton
                testID={'ENABLE_PASTE'}
                color={inputMode ? Colors.CONFIRM : Colors.CHARCOAL}
                onPress={() => toggleInputMode(!inputMode)}
                size={50}
                icon={{ name: 'ios-code', iconFamily: 'Ionicons' }}
              />
            )}
          </Container>
        </Container>
      }
    >
      <Container flex={1} backgroundColor={Colors.BLACK}>
        {inputMode ? (
          <Container justifyContent={'center'} flex={1} padding>
            <TextInput
              testID={'JWT_INPUT'}
              autoCapitalize={'none'}
              autoCorrect={false}
              autoCompleteType={'off'}
              placeholder={'Paste JWT'}
              placeholderTextColor={Colors.MEDIUM_GREY}
              onChangeText={onPasteJWT}
              style={{
                padding: 10,
                color: Colors.LIGHT_GREY,
                backgroundColor: Colors.DARK_GREY,
                borderRadius: 5,
                borderWidth: 1,
              }}
            />
          </Container>
        ) : (
          <RNCamera
            testID={'CAMERA'}
            captureAudio={false}
            style={{ flex: 1 }}
            onBarCodeRead={onBarCodeRead}
          />
        )}
      </Container>
    </Screen>
  )
}
