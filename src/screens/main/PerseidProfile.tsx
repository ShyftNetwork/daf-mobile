import React, { Component } from 'react'
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
  const data = {
    profile: navigation.getParam('profileData') || '',
    image: navigation.getParam('image') || defaultUrl,
  }
  console.log('p profile', data.profile)
  const handleSubmit = async () => {
    // console.log('p profile', data.profile);
    navigation.navigate('PerseidDocuments')
  }
  return (
    <ScrollView>
      <Screen background={'primary'}>
        <Container margin>
          <Text textStyle={styles.title}>Profile</Text>
        </Container>
        <View style={styles.profileView}>
          <Image
            source={{ uri: data.image }}
            style={{ width: 200, height: 200, borderRadius: 180 }}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text textStyle={styles.profileStatus}>Profile Unverified</Text>
        </View>
        <View style={styles.borderbox}>
          <Text textStyle={styles.baseText}>
            {' '}
            First Name: {data.profile.firstName}
          </Text>
          <Text textStyle={styles.baseText}>
            {' '}
            Middle Name: {data.profile.middleName}
          </Text>
          <Text textStyle={styles.baseText}>
            {' '}
            Last Name: {data.profile.lastName}{' '}
          </Text>
        </View>
        <View style={styles.borderbox}>
          <Text textStyle={styles.baseText}>
            {' '}
            Date Of Birth:{' '}
            {Moment(data.profile.dateOfBirth).format('DD MMM YYYY')}
          </Text>
        </View>
        <View style={styles.borderbox}>
          <Text textStyle={styles.baseText}>
            {' '}
            Address: {data.profile.address}{' '}
          </Text>
          <Text textStyle={styles.baseText}>
            {' '}
            Parish: {data.profile.parish}{' '}
          </Text>
          <Text textStyle={styles.baseText}>
            {' '}
            Country: {data.profile.country}{' '}
          </Text>
          <Text textStyle={styles.baseText}>
            {' '}
            Postal Code: {data.profile.postalCode}{' '}
          </Text>
        </View>
        <View style={styles.borderbox}>
          <Text textStyle={styles.baseText}> Email: {data.profile.email} </Text>
        </View>
        <Container marginTop background={'primary'} alignItems={'center'}>
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
      </Screen>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
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
