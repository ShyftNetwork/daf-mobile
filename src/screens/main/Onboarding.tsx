import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Screen, Container, Button, Constants, Text } from '@kancha/kancha-ui'
import { NavigationStackScreenProps } from 'react-navigation-stack'

interface OnboardingProps extends NavigationStackScreenProps {}

const Onboarding: React.FC<OnboardingProps> = ({ navigation }) => {
  const { t } = useTranslation()
  return (
    <Screen>
      <Container alignItems={'center'} flex={1} padding>
        <Container marginTop={30}>
          <Text type={Constants.TextTypes.H2} bold>
            Get started!
          </Text>
        </Container>
        {/* <Container marginTop={30}>
          <Text type={Constants.TextTypes.Body} textAlign={'center'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Container>
        <Container w={300} marginTop>
          <Button
            fullWidth
            type={Constants.BrandOptions.Primary}
            block={Constants.ButtonBlocks.Outlined}
            buttonText={t('Restore seed')}
            onPress={() => navigation.navigate('Restore')}
          />
        </Container> */}
        <Container marginTop={30}>
          <Text type={Constants.TextTypes.Body} textAlign={'center'}>
            Welcome to Perseid's Accounting System. This digital wallet
            interfaces with the accounting system as well as hold native crypto
            currency
          </Text>
        </Container>
        <Container w={300} marginTop={30}>
          <Button
            fullWidth
            type={Constants.BrandOptions.Primary}
            block={Constants.ButtonBlocks.Filled}
            buttonText={t('Create New Identity')}
            onPress={() => navigation.navigate('CreatingWallet')}
          />
        </Container>
      </Container>
    </Screen>
  )
}

export default Onboarding
