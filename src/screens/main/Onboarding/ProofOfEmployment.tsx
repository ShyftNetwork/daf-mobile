import React, { useState } from 'react'
import { StyleSheet, TextInput, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Screen, Container, Button, Constants, Text } from '@kancha/kancha-ui'
import { NavigationStackProp } from 'react-navigation-stack'
import DatePicker from 'react-native-date-picker'
import RNPickerSelect from 'react-native-picker-select'

type Props = {
  navigation: NavigationStackProp
}

const ProofOfEmployment: React.FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState()
  const [middleName, setMiddleName] = useState()
  const [lastName, setLastName] = useState()
  const [dateOfCommencement, setDateOfCommencement] = useState(new Date())
  const [currentPosition, setCurrentPosition] = useState()

  const createProfile = () => {
    navigation.navigate('ProfileSuccess', {
      firstName,
      lastName,
      middleName,
      dateOfCommencement,
      currentPosition,
    })
  }
  return (
    <Screen background={'primary'}>
      <ScrollView>
        <Container margin>
          <Text textStyle={styles.title}> Add Proof of Employement </Text>
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
          <Text type={Constants.TextTypes.Body}>Date Of Commencement</Text>
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
          <Text type={Constants.TextTypes.Body}>Current Position</Text>
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
        <Container background={'primary'} alignItems={'center'}>
          <Container w={300} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Save and Proceed'}
              onPress={createProfile}
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

export default ProofOfEmployment
