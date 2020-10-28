import React, { useState } from 'react'
import { Container, Button, Constants, Text } from '@kancha/kancha-ui'
import { StyleSheet, Image, View, AsyncStorage } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

interface TakeAPictureProps {
  setImage: string
  documentType: string
}
const TakeAPicture: React.FC<TakeAPictureProps> = ({
  setImage,
  documentType,
}) => {
  const [image, setNewImage] = useState(setImage)

  const takeProfilePicture = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      includeBase64: true,
    }).then(image => {
      setNewImage(image.path)
    })
  }
  const selectFromGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      includeBase64: true,
    }).then(image => {
      setNewImage(image.path)
    })
  }
  return (
    <>
      <View style={styles.profileView}>
        <Image
          source={{ uri: image }}
          style={{ width: 300, height: 300 }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.viewContainer}>
        <Container w={370} marginBottom>
          <Button
            fullWidth
            block={Constants.ButtonBlocks.Outlined}
            type={Constants.BrandOptions.Primary}
            buttonText={'Take A Picture'}
            onPress={takeProfilePicture}
          />
        </Container>
        <Container w={370} marginBottom>
          <Button
            fullWidth
            block={Constants.ButtonBlocks.Outlined}
            type={Constants.BrandOptions.Primary}
            buttonText={'Choose from Gallery'}
            onPress={selectFromGallery}
          />
        </Container>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  viewContainer: {
    display: 'flex',
    alignContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10
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
export default TakeAPicture
