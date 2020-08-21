import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { Text } from '@kancha/kancha-ui'
import {
  NavigationStackProp,
  NavigationStackScreenProps,
} from 'react-navigation-stack'
import ImagePicker from 'react-native-image-crop-picker'

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
)

const TakeAPicture: React.FC<NavigationStackScreenProps> = ({ navigation }) => {
  const [imagePath, setImagePath] = useState('')
  const takePicture = async camera => {
    const options = { quality: 0.5, base64: true }
    const data = await camera.takePictureAsync(options)
    //  eslint-disable-next-line
    console.log('takeAPicture imagePath', data.uri)
    navigation.navigate('SetProfilePicture', { imagePath: data.uri })
  }

  const selectFromGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image)
      cropPicture(image)
    })
  }

  const cropPicture = async image => {
    ImagePicker.openCropper({
      path: 'my-file-path.jpg',
      width: 300,
      height: 400,
    }).then(image => {
      console.log(image)
    })
  }

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        {({ camera, status }) => {
          if (status !== 'READY') return <PendingView />
          return (
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}
              >
                <Text textStyle={{ fontSize: 14 }}> Capture </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => selectFromGallery()}
                style={styles.capture}
              >
                <Text textStyle={{ fontSize: 14 }}> Gallery </Text>
              </TouchableOpacity>
            </View>
          )
        }}
      </RNCamera>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
})

export default TakeAPicture
