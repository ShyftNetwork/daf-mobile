import React, { useState } from 'react'
import { StyleSheet, TextInput, ScrollView, Image, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Screen, Container, Button, Constants, Text } from '@kancha/kancha-ui'
import { NavigationStackProp } from 'react-navigation-stack'
import DatePicker from 'react-native-date-picker'
import CountryList from './CountryList'
import RNPickerSelect from 'react-native-picker-select'
import ImagePicker from 'react-native-image-crop-picker'

type Props = {
  navigation: NavigationStackProp
}

const Passport: React.FC<Props> = ({ navigation }) => {
  const defaultUrl =
    'https://iran.1stquest.com/blog/wp-content/uploads/2019/10/Passport-1.jpg'

  const [firstName, setFirstName] = useState()
  const [middleName, setMiddleName] = useState()
  const [lastName, setLastName] = useState()
  const [dateOfBirth, setDateOfBirth] = useState(new Date())
  const [expiryDate, setExpiryDate] = useState(new Date())
  const [nationality, setNationality] = useState()
  const [birthPlace, setBirthplace] = useState()
  const [passportNumber, setPassportNumber] = useState()
  const [passportImage, setPassportImage] = useState(defaultUrl)

  const takeProfilePicture = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPassportImage(image.path)
    })
  }
  const selectFromGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPassportImage(image.path)
    })
  }

  const createProfile = () => {
    navigation.navigate('DriversLicense', {
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      passportNumber,
      expiryDate,
      nationality,
      birthPlace,
    })
  }
  return (
    <Screen background={'primary'}>
      <ScrollView>
        <Container margin>
          <Text textStyle={styles.title}> Add Passport Information </Text>
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
          <Text type={Constants.TextTypes.Body}>Nationality</Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <RNPickerSelect
            onValueChange={itemValue => setNationality(itemValue)}
            items={CountryList}
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
          <Text type={Constants.TextTypes.Body}>Expiry Date</Text>
        </Container>
        <Container paddingLeft={15} br={5}>
          <DatePicker
            date={expiryDate}
            onDateChange={setExpiryDate}
            mode={'date'}
            locale={'en'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text type={Constants.TextTypes.Body}>Birth Place</Text>
        </Container>
        <Container background={'secondary'} padding margin br={5}>
          <RNPickerSelect
            onValueChange={itemValue => setBirthplace(itemValue)}
            items={CountryList}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text type={Constants.TextTypes.Body}>Passport Number</Text>
        </Container>

        <Container background={'secondary'} padding margin br={5}>
          <TextInput
            value={passportNumber}
            onChangeText={setPassportNumber}
            placeholder={''}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
          />
        </Container>
        <Container paddingHorizontal marginTop>
          <Text type={Constants.TextTypes.Body}>Passport Image</Text>
        </Container>
        <View style={styles.profileView}>
          <Image
            source={{ uri: passportImage }}
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.viewContainer}>
          <Container w={155} marginBottom marginLeft marginRight>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Take A Picture'}
              onPress={takeProfilePicture}
            />
          </Container>
          <Container w={200} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Choose from Gallery'}
              onPress={selectFromGallery}
            />
          </Container>
        </View>
        <Container background={'primary'} alignItems={'center'}>
          <Container w={370} marginBottom>
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
  },
})

export default Passport
