import React, { Component } from 'react'
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
    healthInsuranceNumber: navigation.getParam('healthInsuranceNumber') || '',
  }
  // console.log('profile', profile);

  const handleSubmit = async () => {
    navigation.navigate('Passport')
    return await AsyncStorage.setItem('profile', JSON.stringify(profile))
  }
  return (
    <ScrollView>
      <Screen background={'primary'}>
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
        <Container margin>
          <Text textStyle={styles.baseText}>
            {' '}
            Health Insurance Number: {profile.healthInsuranceNumber}{' '}
          </Text>
        </Container>
        <Container marginTop background={'primary'} alignItems={'center'}>
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
      </Screen>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  baseText: {
    fontSize: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
})

export default ReviewProfile
