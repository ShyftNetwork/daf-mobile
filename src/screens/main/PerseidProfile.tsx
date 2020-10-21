import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Screen, Container, Button, Constants, Text } from '@kancha/kancha-ui'
import { View, Image } from 'react-native'
import {
  NavigationStackProp,
  NavigationStackScreenProps,
} from 'react-navigation-stack'
import Moment from 'moment'
import { ScrollView } from 'react-native-gesture-handler'

const PerseidProfile: React.FC<NavigationStackScreenProps> = ({
  navigation,
}) => {
  const defaultUrl =
    'https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png'
  const defaultObj = {
    firstName: '',
    lastName: '',
    middleName: '',
    dateOfBirth: new Date(),
    address: '',
    country: '',
    parish: '',
    email: '',
    postalCode: '',
  }
  const [profileData, setProfileData] = useState(defaultObj)
  const getProfile = async () => {
    const profileData = await AsyncStorage.getItem('profile')
    if (profileData) {
      console.log('profileData', profileData)
      setProfileData(JSON.parse(profileData))
    }
    return () => {
      console.log('This will be logged on unmount')
    }
  }
  useEffect(() => {
    getProfile()
  }, [])

  const handleSubmit = async () => {
    // const image = data.image
    navigation.navigate('PerseidDocuments', { profileData })
  }
  return (
    <ScrollView style={styles.background}>
      <View style={styles.background}>
        <Container margin>
          <Text textStyle={styles.title}>Profile</Text>
        </Container>
        {/* <View style={styles.profileView}>
          <Image
            source={{ uri: data.image }}
            style={{ width: 200, height: 200, borderRadius: 180 }}
            resizeMode="contain"
          />
        </View> */}
        <View>
          <Text textStyle={styles.profileStatus}>Profile Unverified</Text>
        </View>
        <View style={styles.borderbox}>
          <Text textStyle={styles.baseText}>
            {' '}
            First Name: {profileData.firstName}
          </Text>
          <Text textStyle={styles.baseText}>
            {' '}
            Middle Name: {profileData.middleName}
          </Text>
          <Text textStyle={styles.baseText}>
            {' '}
            Last Name: {profileData.lastName}{' '}
          </Text>
        </View>
        <View style={styles.borderbox}>
          <Text textStyle={styles.baseText}>
            {' '}
            Date Of Birth:{' '}
            {Moment(profileData.dateOfBirth).format('DD MMM YYYY')}
          </Text>
        </View>
        <View style={styles.borderbox}>
          <Text textStyle={styles.baseText}>
            {' '}
            Address: {profileData.address}{' '}
          </Text>
          <Text textStyle={styles.baseText}>
            {' '}
            Parish: {profileData.parish}{' '}
          </Text>
          <Text textStyle={styles.baseText}>
            {' '}
            Country: {profileData.country}{' '}
          </Text>
          <Text textStyle={styles.baseText}>
            {' '}
            Postal Code: {profileData.postalCode}{' '}
          </Text>
        </View>
        <View style={styles.borderbox}>
          <Text textStyle={styles.baseText}> Email: {profileData.email} </Text>
        </View>
        <Container marginTop alignItems={'center'}>
          <Container w={300} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'View Documents'}
              onPress={handleSubmit}
            />
          </Container>
        </Container>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#042f66',
    color: 'white',
  },
  borderbox: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
  },
  profileStatus: {
    color: 'red',
    fontSize: 24,
    textAlign: 'center',
  },
  baseText: {
    fontSize: 18,
    color: '#e07b39',
  },
  profileView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
})

export default PerseidProfile
