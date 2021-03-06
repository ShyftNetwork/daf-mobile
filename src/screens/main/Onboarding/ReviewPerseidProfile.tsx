import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Screen, Container, Button, Constants, Text } from '@kancha/kancha-ui'
import {
  NavigationStackProp,
  NavigationStackScreenProps,
} from 'react-navigation-stack'
import Moment from 'moment'
import { ScrollView } from 'react-native-gesture-handler'

const ReviewProfile: React.FC<NavigationStackScreenProps> = ({
  navigation,
}) => {
  let options = { year: 'numeric', month: 'long', day: 'numeric' }
  const profile = {
    firstName: navigation.getParam('firstName') || '',
    middleName: navigation.getParam('middleName') || '',
    lastName: navigation.getParam('lastName') || '',
    dateOfBirth:
      navigation.getParam('dateOfBirth') ||
      new Date().toLocaleDateString('en-US', options),
    address: navigation.getParam('address') || '',
    parish: navigation.getParam('parish') || '',
    country: navigation.getParam('country') || '',
    postalCode: navigation.getParam('postalCode') || '',
    email: navigation.getParam('email') || '',
  }

  const handleSubmit = async () => {
    navigation.navigate('SetProfilePicture', { profile })
    return await AsyncStorage.setItem('profile', JSON.stringify(profile))
  }
  return (
    <Screen background={'primary'}>
      <ScrollView style={styles.background}>
        <Container margin>
          <Text textStyle={styles.title}>
            {' '}
            Thank you {profile.firstName}, now let's add your photo and verify
            your information{' '}
          </Text>
        </Container>
        <Container margin>
          <Text textStyle={styles.baseText}>
            {' '}
            First Name: {profile.firstName}
          </Text>
        </Container>
        <Container margin>
          <Text textStyle={styles.baseText}>
            {' '}
            Middle Name: {profile.middleName}
          </Text>
        </Container>
        <Container margin>
          <Text textStyle={styles.baseText}>
            {' '}
            Last Name: {profile.lastName}{' '}
          </Text>
        </Container>
        <Container margin>
          <Text textStyle={styles.baseText}>
            {' '}
            Date Of Birth: {Moment(profile.dateOfBirth).format('DD MMM YYYY')}
          </Text>
        </Container>
        <Container margin>
          <Text textStyle={styles.baseText}> Address: {profile.address} </Text>
        </Container>
        <Container margin>
          <Text textStyle={styles.baseText}> Parish: {profile.parish} </Text>
        </Container>
        <Container margin>
          <Text textStyle={styles.baseText}> Country: {profile.country} </Text>
        </Container>
        <Container margin>
          <Text textStyle={styles.baseText}>
            {' '}
            Postal Code: {profile.postalCode}{' '}
          </Text>
        </Container>
        <Container margin>
          <Text textStyle={styles.baseText}> Email: {profile.email} </Text>
        </Container>
        <Container marginTop alignItems={'center'}>
          <Container w={300} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Confirm and Proceed'}
              onPress={handleSubmit}
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
    fontSize: 18,
    color: '#e07b39',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e07b39',
  },
})

export default ReviewProfile
