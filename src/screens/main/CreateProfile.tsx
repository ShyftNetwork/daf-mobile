import React, { useState } from 'react'
import {
  StyleSheet,
  TextInput,
  ScrollView,
  Picker,
  View,
  ActivityIndicator,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { Screen, Container, Button, Constants, Text } from '@kancha/kancha-ui'
import { NavigationStackProp } from 'react-navigation-stack'
import DatePicker from 'react-native-date-picker'
import navigationService from 'Serto/src/navigators/navigationService'
import ReviewProfile from './ReviewProfile'
import RNPickerSelect from 'react-native-picker-select'

type Props = {
  navigation: NavigationStackProp
}

const CreateProfile: React.FC<Props> = ({ navigation }) => {
  let options = { year: 'numeric', month: 'long', day: 'numeric' }
  const [firstName, setFirstName] = useState()
  const [middleName, setMiddleName] = useState()
  const [lastName, setLastName] = useState()
  const [dateOfBirth, setDateOfBirth] = useState(new Date())
  const [address, setAddress] = useState()
  const [parish, setParish] = useState()
  const [country, setCountry] = useState()
  const [postalCode, setPostalCode] = useState()
  const [email, setEmail] = useState()
  const [healthInsuranceNumber, setHealthInsuranceNumber] = useState()

  const createProfile = () => {
    navigation.navigate('ReviewProfile', {
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      address,
      parish,
      country,
      postalCode,
      email,
      healthInsuranceNumber,
    })
  }
  return (
    <Screen background={'primary'}>
      <ScrollView>
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
          <Text type={Constants.TextTypes.Body}>Date Of Birth</Text>
        </Container>
        <Container paddingLeft={15} br={5}>
          <DatePicker
            date={dateOfBirth}
            onDateChange={setDateOfBirth}
            mode={'date'}
            locale={'en'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text type={Constants.TextTypes.Body}>Address</Text>
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
          <Text type={Constants.TextTypes.Body}>Parish</Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <RNPickerSelect
            onValueChange={itemValue => setParish(itemValue)}
            items={[
              { label: 'Hamilton Parish', value: 'HamiltonParish' },
              { label: 'Paget Parish', value: 'PagetParish' },
              { label: 'Sandys Parish', value: 'SandysParish' },
              { label: 'Smith`s Parish', value: 'SmithsParish' },
              { label: 'Southampton Parish', value: 'SouthamptonParish' },
              { label: 'St. David`s Island', value: 'StDavidsIsland' },
              { label: 'St. George`s Parish', value: 'StGeorgesParish' },
              { label: 'Warwick Parish', value: 'WarwickParish' },
            ]}
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
          <Text type={Constants.TextTypes.Body}>Postal Code</Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder={'Name'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text type={Constants.TextTypes.Body}>Email</Text>
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
        <Container paddingHorizontal marginTop>
          <Text type={Constants.TextTypes.Body}>Health Insurance Number</Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={healthInsuranceNumber}
            onChangeText={setHealthInsuranceNumber}
            placeholder={'Name'}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container background={'primary'} alignItems={'center'}>
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

export default CreateProfile
