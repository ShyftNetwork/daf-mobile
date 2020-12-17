import React, { useState } from 'react'
import { StyleSheet, TextInput, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Screen, Container, Button, Constants, Text } from '@kancha/kancha-ui'
import { NavigationStackProp } from 'react-navigation-stack'
import { useMutation } from '@apollo/react-hooks'
import { SIGN_VC_MUTATION, NEW_MESSAGE } from '../../../lib/graphql/queries'
import DatePicker from 'react-native-date-picker'
import TakeAPicture from '../../../navigators/components/TakeAPicture'

type Props = {
  navigation: NavigationStackProp
}

const ProofOfEmployment: React.FC<Props> = ({ navigation }) => {
  const defaultUrl =
    'https://iran.1stquest.com/blog/wp-content/uploads/2019/10/Passport-1.jpg'
  const did = navigation.getParam('did')
  const [assetId, setAssetId] = useState('')
  const [documentType, setDocumentType] = useState('Proof Of Employment')
  const [firstName, setFirstName] = useState()
  const [middleName, setMiddleName] = useState()
  const [lastName, setLastName] = useState()
  const [dateOfCommencement, setDateOfCommencement] = useState(new Date())
  const [currentPosition, setCurrentPosition] = useState()

  const obj = {
    id: did,
    documentType,
    firstName,
    lastName,
    middleName,
    dateOfCommencement,
    currentPosition,
    assetId,
  }

  const [handleMessage] = useMutation(NEW_MESSAGE, {
    onCompleted: () => {
      navigation.navigate('Activity')
    },
  })

  const handleAssetId = (id: string) => {
    setAssetId(id)
  }

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
          credentialSubject: obj,
        },
      },
    })
  }
  return (
    <Screen background={'primary'}>
      <ScrollView style={styles.background}>
        <Container margin>
          <Text textStyle={styles.title}> Add Proof of Employement </Text>
        </Container>
        <Container margin>
          <Text textStyle={styles.baseText}>
            {' '}
            Document Type: {documentType}{' '}
          </Text>
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>
            First name
          </Text>
        </Container>
        <Container background={'secondary'} margin padding br={5}>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder={'First Name'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>
            Middle name
          </Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={middleName}
            onChangeText={setMiddleName}
            placeholder={'Middle Name'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>
            Last name
          </Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder={'Last Name'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>
            Date Of Commencement
          </Text>
        </Container>
        <Container paddingLeft={15} br={5}>
          <DatePicker
            date={dateOfCommencement}
            onDateChange={setDateOfCommencement}
            mode={'date'}
            locale={'en'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>
            Current Position
          </Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={currentPosition}
            onChangeText={setCurrentPosition}
            placeholder={'Manager'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>
            Proof of Employment Image
          </Text>
        </Container>
        <TakeAPicture defaultImage={defaultUrl} assetID={handleAssetId} />
        <Container alignItems={'center'}>
          <Container w={370} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Create Credential'}
              onPress={signVc}
              disabled={assetId === ''}
            />
          </Container>
        </Container>
      </ScrollView>
    </Screen>
  )
}
const styles = StyleSheet.create({
  whiteBackground: {
    backgroundColor: 'white',
  },
  background: {
    backgroundColor: '#042f66',
  },
  baseText: {
    color: '#e07b39',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e07b39',
  },
})

export default ProofOfEmployment
