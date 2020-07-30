import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Screen, Container, Button, Constants, Text } from '@kancha/kancha-ui'
import {
  NavigationStackProp,
  NavigationStackScreenProps,
} from 'react-navigation-stack'

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
    navigation.navigate('TakeAPicture')
    return await AsyncStorage.setItem('selectedDid', profile)
  }
  return (
    <Screen background={'primary'}>
      <Container margin>
        <Text textStyle={styles.title}> Review Profile </Text>
      </Container>
      <Container margin>
        <Text textStyle={styles.baseText}>
          {' '}
          First Name: {profile.firstName}{' '}
        </Text>
      </Container>
      <Container margin>
        <Text textStyle={styles.baseText}>
          {' '}
          Middle Name: {profile.middleName}{' '}
        </Text>
      </Container>
      <Container margin>
        <Text textStyle={styles.baseText}> Last Name: {profile.lastName} </Text>
      </Container>
      <Container margin>
        <Text textStyle={styles.baseText}>
          {' '}
          Date Of Birth: {profile.dateOfBirth.toString()}{' '}
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
