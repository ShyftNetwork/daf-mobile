import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Screen, Container, Button, Constants, Text } from '@kancha/kancha-ui'
import { NavigationStackProp } from 'react-navigation-stack'
import DatePicker from 'react-native-date-picker'
import RNPickerSelect from 'react-native-picker-select'
import CountryList from './CountryList'
import StateList from './StateList'

type Props = {
  navigation: NavigationStackProp
}
let stateList = [{ label: '', value: '' }]
const CreateProfile: React.FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState()
  const [middleName, setMiddleName] = useState()
  const [lastName, setLastName] = useState()
  const [alias, setAlias] = useState()
  const [dateOfBirth, setDateOfBirth] = useState(new Date())
  const [address, setAddress] = useState()
  const [country, setCountry] = useState()
  const [state, setStateName] = useState()
  const [postalCode, setPostalCode] = useState()
  const [email, setEmail] = useState()

  const createProfile = () => {
    navigation.navigate('ReviewProfile', {
      firstName,
      lastName,
      middleName,
      alias,
      dateOfBirth,
      address,
      country,
      state,
      postalCode,
      email,
    })
  }
  const setStateList = val => {
    setCountry(val)
    stateList = StateList.filter(state => {
      return val === state.country_code
    })
    return stateList
  }
  return (
    <Screen background={'primary'}>
      <ScrollView style={styles.background}>
        <Container margin>
          <Text textStyle={styles.title}> Welcome </Text>
          <Text textStyle={styles.title}> Please create your profile </Text>
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>
            Legal First name
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
            Legal Last name
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
            Alias
          </Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={alias}
            onChangeText={setAlias}
            placeholder={'Alias'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>
            Date Of Birth
          </Text>
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
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>
            Address
          </Text>
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
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>
            Country
          </Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <RNPickerSelect
            style={styles.whiteBackground}
            onValueChange={val => setStateList(val)}
            items={CountryList}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>
            State
          </Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <RNPickerSelect
            style={styles.whiteBackground}
            onValueChange={value => setStateName(value)}
            items={stateList}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text textStyle={styles.baseText} type={Constants.TextTypes.Body}>
            Postal Code
          </Text>
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
            Email
          </Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder={'name@email.com'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container style={styles.baseText} alignItems={'center'}>
          <Container w={300} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Create Profile'}
              onPress={createProfile}
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
    textAlign: 'center',
    color: '#e07b39',
  },
})

export default CreateProfile
