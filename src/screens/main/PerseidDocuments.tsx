import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Screen, Container, Button, Constants, Text } from '@kancha/kancha-ui'
import { View, Image } from 'react-native'
import {
  NavigationStackProp,
  NavigationStackScreenProps,
} from 'react-navigation-stack'
import { ScrollView } from 'react-native-gesture-handler'

const PerseidDocuments: React.FC<NavigationStackScreenProps> = ({
  navigation,
}) => {
  const defaultUrl =
    'https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png'
  const data = {
    profile: navigation.getParam('profileData') || '',
    image: navigation.getParam('image') || defaultUrl,
  }

  const handleNavigation = async value => {
    navigation.navigate(value)
  }
  return (
    <ScrollView>
      <Screen background={'primary'}>
        <View style={styles.containerBox}>
          <Image
            style={styles.profileImg}
            source={{ uri: data.image }}
            resizeMode="contain"
          />
          <View style={styles.profileData}>
            <Text textStyle={styles.profileValues}>
              {' '}
              First Name: {data.profile.firstName}
            </Text>
            <Text textStyle={styles.profileValues}>
              {' '}
              Middle Name: {data.profile.middleName}
            </Text>
            <Text textStyle={styles.profileValues}>
              {' '}
              Last Name: {data.profile.lastName}{' '}
            </Text>
          </View>
        </View>
        <Container marginTop background={'primary'} alignItems={'center'}>
          <Container w={300} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Passport'}
              onPress={() => handleNavigation('Passport')}
            />
          </Container>
        </Container>
        <Container marginTop background={'primary'} alignItems={'center'}>
          <Container w={300} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Driver`s License'}
              onPress={() => handleNavigation('DriversLicense')}
            />
          </Container>
        </Container>
        <Container marginTop background={'primary'} alignItems={'center'}>
          <Container w={300} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Utility Bill'}
              onPress={() => handleNavigation('UtilityBill')}
            />
          </Container>
        </Container>
        <Container marginTop background={'primary'} alignItems={'center'}>
          <Container w={300} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Marriage Certificate'}
              onPress={() => handleNavigation('MarriageCertificate')}
            />
          </Container>
        </Container>
        <Container marginTop background={'primary'} alignItems={'center'}>
          <Container w={300} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Health Insurance'}
              onPress={() => handleNavigation('HealthInsurance')}
            />
          </Container>
        </Container>
        <Container marginTop background={'primary'} alignItems={'center'}>
          <Container w={300} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Proof Of Employment'}
              onPress={() => handleNavigation('ProofOfEmployment')}
            />
          </Container>
        </Container>
        <Container marginTop background={'primary'} alignItems={'center'}>
          <Container w={300} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Work Permit'}
              onPress={() => handleNavigation('WorkPermit')}
            />
          </Container>
        </Container>
      </Screen>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  containerBox: {
    display: 'flex',
    alignContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 10,
  },
  profileData: {
    padding: 10,
  },
  profileValues: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 180,
  },
})

export default PerseidDocuments
