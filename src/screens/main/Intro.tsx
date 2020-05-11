/**
 *
 */
import React from 'react'
import {
  Container,
  Text,
  Screen,
  Button,
  Constants,
  Device,
} from '@kancha/kancha-ui'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { Colors } from '../../theme'
import { Image, ImageBackground } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { GET_VIEWER } from '../../lib/graphql/queries'
import { ActivityIndicator } from 'react-native'

const Intro: React.FC<NavigationStackScreenProps> = ({ navigation }) => {
  console.log('Intro: ' + GET_VIEWER + '::' + navigation)
  const { data, loading } = useQuery(GET_VIEWER, {
    onCompleted(response) {
      if (response.viewer !== null) {
        navigation.navigate('App')
      }
    },
  })

  const hasNoIdentityAndNotLoading = !loading && data && data.viewer === null

  return (
    <Screen
      safeAreaBottom={true}
      safeAreaBottomBackground={Colors.WHITE}
      background={'primary'}
      footerComponent={
        hasNoIdentityAndNotLoading && (
          <Container
            paddingHorizontal={true}
            paddingBottom={true}
            backgroundColor={Colors.WHITE}
          >
            <Container alignItems={'center'}>
              <Container w={300}>
                <Button
                  fullWidth
                  block={Constants.ButtonBlocks.Outlined}
                  type={Constants.BrandOptions.Primary}
                  buttonText={'Get Started'}
                  onPress={() => navigation.navigate('Onboarding')}
                />
              </Container>
            </Container>
          </Container>
        )
      }
    >
      {loading && (
        <Container flex={1} alignItems={'center'} justifyContent={'center'}>
          <ActivityIndicator size={'large'} />
          <Text style={{ fontSize: 12 }}>Powered By</Text>
        </Container>
      )}
      {hasNoIdentityAndNotLoading && (
        <Container testID={'ONBOARDING_WELCOME_TOP'}>
          <Container padding alignItems={'center'} marginTop={50}>
            <Text type={Constants.TextTypes.H2} bold>
              Welcome to Perseid DiD Wallet
            </Text>
            <Container marginTop={4}>
              <Text type={Constants.TextTypes.Body}>
                Building trust with the Bermuda Government
              </Text>
            </Container>
          </Container>
          <Container marginTop={50}>
            <Image
              /*source={require('../../assets/images/onboarding_slide_1.png')}*/
              source={require('../../assets/images/bermuda_flag.png')}
              style={{
                alignContent: 'center',
                width: Device.width,
                height: 708 * (Device.width / 750),
              }}
              resizeMode={'contain'}
            ></Image>
          </Container>
        </Container>
      )}
    </Screen>
  )
}

export default Intro
