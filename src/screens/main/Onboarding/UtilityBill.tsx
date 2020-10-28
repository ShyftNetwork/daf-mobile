import React, { useState } from 'react'
import { StyleSheet, TextInput, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Screen, Container, Button, Constants, Text } from '@kancha/kancha-ui'
import { NavigationStackProp } from 'react-navigation-stack'
import { useMutation } from '@apollo/react-hooks'
import { SIGN_VC_MUTATION, NEW_MESSAGE } from '../../../lib/graphql/queries'
import DatePicker from 'react-native-date-picker'
import TakeAPicture from '../../../navigators/components/TakeAPicture'
import RNPickerSelect from 'react-native-picker-select'
import CountryList from './CountryList'
import ParishList from './ParishList'

type Props = {
  navigation: NavigationStackProp
}

const UtilityBill: React.FC<Props> = ({ navigation }) => {
  const defaultUrl =
    'https://iran.1stquest.com/blog/wp-content/uploads/2019/10/Passport-1.jpg'
  const did = navigation.getParam('did')
  const [documentType, setDocumentType] = useState('Utility Bill')
  const [firstName, setFirstName] = useState()
  const [middleName, setMiddleName] = useState()
  const [lastName, setLastName] = useState()
  const [dateOfBillUpload, setDateOfBillUpload] = useState(new Date())
  const [houseNumber, setHouseNumber] = useState()
  const [address, setAddress] = useState()
  const [parish, setParish] = useState()
  const [country, setCountry] = useState()
  const [postalCode, setPostalCode] = useState()
  const [utilityCompanyName, setUtilityCompanyName] = useState()
  const [accountNumber, setAccountNumber] = useState()

  const obj = {
    id: did,
    documentType,
    firstName,
    lastName,
    middleName,
    dateOfBillUpload,
    houseNumber,
    address,
    parish,
    country,
    postalCode,
    utilityCompanyName,
    accountNumber,
  }

  const [handleMessage] = useMutation(NEW_MESSAGE, {
    onCompleted: () => {
      navigation.navigate('Activity')
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
          credentialSubject: obj,
        },
      },
    })
  }
  return (
    <Screen background={'primary'}>
      <ScrollView style={styles.background}>
        <Container margin>
          <Text textStyle={styles.title}> Add Utility Bill </Text>
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
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>Date Of Bill Uploaded</Text>
        </Container>
        <Container paddingLeft={15} br={5}>
          <DatePicker
            date={dateOfBillUpload}
            onDateChange={setDateOfBillUpload}
            mode={'date'}
            locale={'en'}
            style={styles.whiteBackground}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>
            House/Building Name/Apt Number
          </Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={houseNumber}
            onChangeText={setHouseNumber}
            placeholder={'name@email.com'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>Address</Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder={'Address'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>Parish</Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <RNPickerSelect
            style={styles.whiteBackground}
            onValueChange={value => setParish(value)}
            items={ParishList}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>Country</Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <RNPickerSelect
            style={styles.whiteBackground}
            onValueChange={value => setCountry(value)}
            items={CountryList}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>Postal Code</Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder={'12345'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>
            Name of the Utility Company
          </Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <RNPickerSelect
            style={styles.whiteBackground}
            onValueChange={value => setUtilityCompanyName(value)}
            items={[
              { label: 'Belco', value: 'Belco' },
              { label: 'ONE', value: 'One' },
              { label: 'Digicel', value: 'Digicel' },
              { label: 'Watlington', value: 'Watlington' },
            ]}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>Account Number</Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={accountNumber}
            onChangeText={setAccountNumber}
            placeholder={''}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>Utility Bill Image</Text>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e07b39',
  },
})

export default UtilityBill
