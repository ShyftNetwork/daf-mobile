import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { Text } from '@kancha/kancha-ui'
import {
  NavigationStackProp,
  NavigationStackScreenProps,
} from 'react-navigation-stack'

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
  const takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true }
    const data = await camera.takePictureAsync(options)
    //  eslint-disable-next-line
    console.log(data.uri)
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
        {({ camera, status, recordAudioPermissionStatus }) => {
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
                <Text textStyle={{ fontSize: 14 }}> SNAP </Text>
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
