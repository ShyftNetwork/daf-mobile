import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Screen, Container, Button, Constants, Text } from '@kancha/kancha-ui'
import { NavigationStackProp } from 'react-navigation-stack'

type Props = {
  navigation: NavigationStackProp
}

const Onboarding: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation()
  return (
    <Screen background={'primary'}>
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
        <Container marginTop={30} marginRight={30} marginLeft={30}>
          <Text type={Constants.TextTypes.Body} textAlign={'center'}>
            Welcome to PersEID's User Account System. {'\n'} {'\n'}
          </Text>
          <Text type={Constants.TextTypes.Body} textAlign={'left'}>
            This digital wallet interfaces with the account system, allowing you
            full visibility of your credentials and identity throughout the
            Bermuda infrastructure.
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
