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
  const viewProfile = () => {
    navigation.navigate('SetProfilePicture')
  }
  return (
    <ScrollView>
      <Screen background={'primary'}>
        <Container margin>
          <Text textStyle={styles.title}> Thank you </Text>
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
      </Screen>
    </ScrollView>
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
