import React, { useEffect, useContext, useState } from 'react'
import Navigation from './navigators'
import NavigationService from './navigators/navigationService'
import Providers from './providers'
import WalletConnect from './components/WalletConnect'
import { Toast, OverlaySign } from '@kancha/kancha-ui'
import IDSwitcher from './navigators/components/Switcher'
import './lib/I18n'

const App = () => {
  return (
    <Providers>
      <WalletConnect navigate={NavigationService.navigate} />
      <Toast />
      <OverlaySign />
      <Navigation
        ref={navigatorRef =>
          NavigationService.setTopLevelNavigator(navigatorRef)
        }
      />
      <IDSwitcher id={'SWITCH_IDENTITY'} />
    </Providers>
  )
}

export default App
