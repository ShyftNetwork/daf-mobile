import React from 'react'
import { StyleSheet } from 'react-native'
import { Screen, Container, Button, Constants, Text } from '@kancha/kancha-ui'
import {
  NavigationStackProp,
  NavigationStackScreenProps,
} from 'react-navigation-stack'
import { ScrollView } from 'react-native-gesture-handler'

const ProfileSuccess: React.FC<NavigationStackScreenProps> = ({
  navigation,
}) => {
  const defaultUrl =
    'https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png'
  const data = {
    profile: navigation.getParam('profileData') || '',
    image: navigation.getParam('image') || defaultUrl,
  }
  const viewProfile = () => {
    const profileData = data.profile
    const image = data.image
    navigation.navigate('CreatingWallet', { profileData, image })
  }
  return (
    <Screen background={'primary'}>
      <Container alignItems={'center'} flex={1} padding>
        <Container marginTop={30}>
          <Text type={Constants.TextTypes.H2} bold>
            Thank You!
          </Text>
        </Container>
        <Container margin>
          <Text textStyle={styles.baseText}>
            {' '}
            You Have Successfully built your digital ID.{' '}
          </Text>
        </Container>
        <Container margin>
          <Text textStyle={styles.baseText}>
            {' '}
            Let's get started with adding a credential.{' '}
          </Text>
        </Container>
        <Container background={'primary'} alignItems={'center'} marginTop>
          <Container w={300} marginBottom>
            <Button
              fullWidth
              block={Constants.ButtonBlocks.Outlined}
              type={Constants.BrandOptions.Primary}
              buttonText={'View Profile'}
              onPress={viewProfile}
            />
          </Container>
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

export default ProfileSuccess
