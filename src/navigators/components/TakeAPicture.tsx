import React, { useState } from 'react'
import { Container, Button, Constants, Text } from '@kancha/kancha-ui'
import { StyleSheet, Image, View, AsyncStorage } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import base64 from 'base-64'
import { v4 as uuidv4 } from 'uuid'

interface TakeAPictureProps {
  defaultImage: string
  assetID: any
  asset: any
}
const TakeAPicture: React.FC<TakeAPictureProps> = ({
  defaultImage,
  assetID,
  asset,
}) => {
  const [image, setNewImage] = useState(defaultImage)
  const [errorText, setErrorText] = useState('')
  const baseUrl = 'https://testnet.burstiq.com/api/burstchain/'
  const headers = new Headers()
  headers.append(
    'Authorization',
    'Basic ' + base64.encode('perseid_burstiq@shyft.network:9w4OP6Z9xk6%'),
  )
  headers.append('Content-Type', 'application/json')

  const takeProfilePicture = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      includeBase64: true,
    }).then(image => {
      setNewImage(image.path)
      uploadImage(image)
    })
  }
  const selectFromGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      includeBase64: true,
    }).then(image => {
      setNewImage(image.path)
      uploadImage(image)
    })
  }
  const getPrivateId = async () => {
    const options = {
      method: 'get',
      headers,
    }
    const privateIdUrl = baseUrl + 'id/private'
    const response = await fetch(privateIdUrl, options)
    const json = await response.json()
    return json.private_id
  }
  const getPublicId = async () => {
    const options = {
      method: 'get',
      headers,
    }
    const publicIdUrl = baseUrl + 'id/public'
    const response = await fetch(publicIdUrl, options)
    const json = await response.json()
    return json.public_id
  }

  const uploadImage = async image => {
    const uploadImageUrl = baseUrl + 'shyft/ppk_owners/asset'
    const uniqueId = uuidv4()
    const publicID = await getPublicId()
    const privateID = await getPrivateId()
    const body = {
      owners: [publicID],
      asset: {
        id: uniqueId,
        private_key: privateID,
        public_key: publicID,
      },
      asset_metadata: image,
    }
    const options = {
      method: 'post',
      headers,
      body: JSON.stringify(body),
    }
    const uploadAsset = await fetch(uploadImageUrl, options)
    const response = await uploadAsset.json()
    if (response.asset_id) assetID(response.asset_id)
    else setErrorText('There is an issue uploading image on the blockchain')
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
          <Text textStyle={{ color: 'red' }}>{errorText}</Text>
        </Container>
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
    marginLeft: 10,
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
