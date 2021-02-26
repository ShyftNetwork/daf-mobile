import React, { useState, useEffect } from 'react'
import { Image } from 'react-native'
import base64 from 'base-64'
import { Container, Text, Screen, Constants } from '@kancha/kancha-ui'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { NavigationStackScreenProps } from 'react-navigation-stack'

const GetDocumentImage: React.FC<NavigationStackScreenProps> & {
  navigationOptions: any
} = ({ navigation }) => {
  const defaultUrl =
    'https://iran.1stquest.com/blog/wp-content/uploads/2019/10/Passport-1.jpg'
  const assetId = '82644f2f-14a1-4fc3-9189-a7da9c942010' // navigation.getParam('assetId')
  const fetchMessages = navigation.getParam('fetchMessages')
  const [image, setImage] = useState(defaultUrl)
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    const baseUrl = 'https://testnet.burstiq.com/api/burstchain/'
    const headers = new Headers()
    headers.append(
      'Authorization',
      'Basic ' + base64.encode('perseid_burstiq@shyft.network:9w4OP6Z9xk6%'),
    )
    headers.append('Content-Type', 'application/json')
    const getAsset = async (assetId: String) => {
      const uploadImageUrl = baseUrl + 'shyft/ppk_owners/' + assetId + '/latest'
      const options = {
        method: 'get',
        headers,
      }
      try {
        const uploadAsset = await fetch(uploadImageUrl, options)
        const response = await uploadAsset.json()
        setImage(response.asset_metadata.data)
      } catch (err) {
        setErrorText('There has been a problem fetching your document image')
        // ADD THIS THROW error
        throw err
      }
    }
    getAsset(assetId)
  }, [])

  return (
    <Screen scrollEnabled background={'primary'}>
      <Container padding marginTop={10}>
        <Text type={Constants.TextTypes.Body}>
          Below is the document image attached with your credential.
        </Text>
      </Container>
      <Container marginLeft={15}>
        <Image
          source={{ uri: `data:image/gif;base64, ${image}` }}
          style={{ width: 350, height: 300 }}
          resizeMode="contain"
        />
      </Container>
      <Container padding marginTop={10}>
        <Text type={Constants.TextTypes.Body}>{errorText}</Text>
      </Container>
    </Screen>
  )
}

GetDocumentImage.navigationOptions = ({ navigation }: any) => {
  return {
    title: 'Document Image',
    headerLeft: (
      <HeaderButtons>
        <Item title={'Back'} onPress={navigation.dismiss} />
      </HeaderButtons>
    ),
  }
}

export default GetDocumentImage
