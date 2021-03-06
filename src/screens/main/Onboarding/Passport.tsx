import React, { useState } from 'react'
import { StyleSheet, TextInput, ScrollView, Image, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Screen, Container, Button, Constants, Text } from '@kancha/kancha-ui'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import CountryList from './CountryList'
import { useMutation } from '@apollo/react-hooks'
import { SIGN_VC_MUTATION, NEW_MESSAGE } from '../../../lib/graphql/queries'
import DatePicker from 'react-native-date-picker'
import ImagePicker from 'react-native-image-crop-picker'
import TakeAPicture from '../../../navigators/components/TakeAPicture'
import RNPickerSelect from 'react-native-picker-select'

const Passport: React.FC<NavigationStackScreenProps> = ({ navigation }) => {
  const defaultUrl =
    'https://iran.1stquest.com/blog/wp-content/uploads/2019/10/Passport-1.jpg'
  const did = navigation.getParam('did')
  const fetchMessages = navigation.getParam('fetchMessages')
  const [firstName, setFirstName] = useState()
  const [documentType, setDocumentType] = useState('Passport')
  const [middleName, setMiddleName] = useState()
  const [lastName, setLastName] = useState()
  const [dateOfBirth, setDateOfBirth] = useState(new Date())
  const [expiryDate, setExpiryDate] = useState(new Date())
  const [nationality, setNationality] = useState()
  const [birthPlace, setBirthplace] = useState()
  const [documentNumber, setDocumentNumber] = useState()
  const [image, setImage] = useState(defaultUrl)

  const [handleMessage] = useMutation(NEW_MESSAGE, {
    onCompleted: () => {
      fetchMessages()
      navigation.dismiss()
    },
  })

  const obj = {
    id: did,
    documentType,
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    documentNumber,
    expiryDate,
    nationality,
    birthPlace
  }

  // const [handleMessage] = useMutation(NEW_MESSAGE, {
  //   onCompleted: () => {
  //     navigation.navigate('Activity')
  //   },
  // })

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
          <Text textStyle={styles.title}> Add Passport Information </Text>
        </Container>
        <Container margin>
          <Text textStyle={styles.baseText}> Document Type: {documentType} </Text>
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>First name</Text>
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
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>Middle name</Text>
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
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>Last name</Text>
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
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>Nationality</Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <RNPickerSelect
            style={styles.whiteBackground}
            onValueChange={value => setNationality(value)}
            items={CountryList}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>Date Of Birth</Text>
        </Container>
        <Container paddingLeft={15} br={5}>
          <DatePicker
            date={dateOfBirth}
            onDateChange={setDateOfBirth}
            mode={'date'}
            locale={'en'}
            style={styles.whiteBackground}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>Expiry Date</Text>
        </Container>
        <Container paddingLeft={15} br={5}>
          <DatePicker
            date={expiryDate}
            onDateChange={setExpiryDate}
            mode={'date'}
            locale={'en'}
            style={styles.whiteBackground}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>Birth Place</Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <RNPickerSelect
            style={styles.whiteBackground}
            onValueChange={label => setBirthplace(label)}
            items={CountryList}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>Passport Number</Text>
        </Container>

        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={documentNumber}
            onChangeText={setDocumentNumber}
            placeholder={''}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>Passport Image</Text>
        </Container>
        <TakeAPicture defaultImage={defaultUrl} />
        <Container alignItems={'center'}>
          <Container w={370} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Create Credential'}
              onPress={signVc}
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
  viewContainer: {
    display: 'flex',
    alignContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 10,
  },
  profileView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e07b39',
  },
})

export default Passport
