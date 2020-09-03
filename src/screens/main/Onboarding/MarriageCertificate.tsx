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

const MarriageCertificate: React.FC<Props> = ({ navigation }) => {
  const defaultUrl =
    'https://iran.1stquest.com/blog/wp-content/uploads/2019/10/Passport-1.jpg'
  const did = navigation.getParam('did')
  let options = { year: 'numeric', month: 'long', day: 'numeric' }
  const [firstName, setFirstName] = useState()
  const [middleName, setMiddleName] = useState()
  const [lastName, setLastName] = useState()
  const [firstName2, setFirstName2] = useState()
  const [middleName2, setMiddleName2] = useState()
  const [lastName2, setLastName2] = useState()
  const [dateOfMarriage, setDateOfMarraige] = useState(new Date())
  const [country, setCountry] = useState()
  const [certificateNumber, setCertificateNumber] = useState()

  const obj = {
    id: did,
    firstName,
    lastName,
    middleName,
    firstName2,
    lastName2,
    middleName2,
    dateOfMarriage,
    certificateNumber,
  }

  const [handleMessage] = useMutation(NEW_MESSAGE, {
    onCompleted: () => {
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
    console.log('did', did)
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
      <ScrollView>
        <Container margin>
          <Text textStyle={styles.title}> Add Marriage Certificate </Text>
        </Container>
        <Container paddingHorizontal marginTop>
          <Text type={Constants.TextTypes.Body}>First name</Text>
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
          <Text type={Constants.TextTypes.Body}>Middle name</Text>
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
          <Text type={Constants.TextTypes.Body}>Last name</Text>
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
          <Text type={Constants.TextTypes.Body}>First name (Spouse)</Text>
        </Container>
        <Container background={'secondary'} margin padding br={5}>
          <TextInput
            value={firstName2}
            onChangeText={setFirstName2}
            placeholder={'First Name'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text type={Constants.TextTypes.Body}>Middle name (Spouse)</Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={middleName2}
            onChangeText={setMiddleName2}
            placeholder={'Middle Name'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text type={Constants.TextTypes.Body}>Last name (Spouse)</Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={lastName2}
            onChangeText={setLastName2}
            placeholder={'Last Name'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text type={Constants.TextTypes.Body}>Date Of Marriage</Text>
        </Container>
        <Container paddingLeft={15} br={5}>
          <DatePicker
            date={dateOfMarriage}
            onDateChange={setDateOfMarraige}
            mode={'date'}
            locale={'en'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text type={Constants.TextTypes.Body}>Country</Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={country}
            onChangeText={setCountry}
            placeholder={'Bermuda'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text type={Constants.TextTypes.Body}>Certificate Number</Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={certificateNumber}
            onChangeText={setCertificateNumber}
            placeholder={''}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text type={Constants.TextTypes.Body}>
            Marraige Certificate Image
          </Text>
        </Container>
        <TakeAPicture defaultImage={defaultUrl} />
        <Container background={'primary'} alignItems={'center'}>
          <Container w={300} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Save and Proceed'}
              onPress={signVc}
            />
          </Container>
        </Container>
      </ScrollView>
    </Screen>
  )
}
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
})

export default MarriageCertificate
