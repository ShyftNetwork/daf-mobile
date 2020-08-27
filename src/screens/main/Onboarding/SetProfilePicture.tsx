import React, { useState, Component } from 'react'
import { StyleSheet, View, ScrollView, Image, Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Screen, Container, Button, Constants, Text } from '@kancha/kancha-ui'
import ImagePicker from 'react-native-image-crop-picker'
import {
  NavigationStackProp,
  NavigationStackScreenProps,
} from 'react-navigation-stack'

const SetProfilePicture: React.FC<NavigationStackScreenProps> = ({
  navigation,
}) => {
  const defaultUrl =
    'https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png'
  const [image, setImagePath] = useState(defaultUrl)
  const data = {
    profile: navigation.getParam('profile') || '',
  }
  const takeProfilePicture = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImagePath(image.path)
    })
  }
  const selectFromGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImagePath(image.path)
    })
  }
  const handleNavigation = async () => {
    const profileData = data.profile
    navigation.navigate('ProfileSuccess', { profileData, image })
  }

  return (
    <Screen background={'primary'}>
      <ScrollView>
        <Container margin>
          <Text textStyle={styles.title}> Set Profile Picture </Text>
        </Container>
        <View style={styles.profileView}>
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 400, borderRadius: 180 }}
            resizeMode="contain"
          />
        </View>
        <Container background={'primary'} alignItems={'center'}>
          <Container w={300} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Take A Picture'}
              onPress={takeProfilePicture}
            />
          </Container>
        </Container>
        <Container background={'primary'} alignItems={'center'}>
          <Container w={300} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Choose from Gallery'}
              onPress={selectFromGallery}
            />
          </Container>
        </Container>
        <Container background={'primary'} alignItems={'center'}>
          <Container w={300} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'Next'}
              onPress={handleNavigation}
            />
          </Container>
        </Container>
      </ScrollView>
    </Screen>
  )
}
const styles = StyleSheet.create({
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

export default SetProfilePicture
