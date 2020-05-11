import React from 'react'
import i18n from '../lib/I18n'
import { Image } from 'react-native'
import {
  createAppContainer,
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  createSwitchNavigator,
} from 'react-navigation'
import {
  createStackNavigator,
  StackViewTransitionConfigs,
} from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { Icon } from '@kancha/kancha-ui'
import TabAvatar from './components/TabAvatar'
import { Colors, Icons } from '../theme'
import { Screens } from './screens'

// Main Screens
import Activity from '../screens/main/Activity'
import Explore from '../screens/main/Explore'
import ViewerProfile from '../screens/main/ViewerProfile'
import Profile from '../screens/main/Profile'
import Onboarding from '../screens/main/Onboarding'
import Restore from '../screens/main/Restore'
import Intro from '../screens/main/Intro'
import PerseidLogin from '../screens/main/PerseidLogin'
import Login from '../screens/main/Login'

import Scanner from '../screens/main/Scanner'
import MessageProcess from '../screens/main/MessageProcess'
import Request from '../screens/main/Request'
import Requests from '../screens/main/Requests/Requests'
import Credential from '../screens/main/Credential'
import CreatingWallet from '../screens/main/CreateIdentity'
import CreateFirstCredential from '../screens/main/CreateFirstCredential'
import IssueCredentialScreen from '../screens/main/IssueCredential'

// Settings
import Settings from '../screens/settings/Settings'
import ShowSecret from '../screens/settings/ShowSecret'

// Developer tooling.  * == Deprecated. Will be removed soon.
import Signer from '../screens/settings/Signer'
import DidViewer from '../screens/settings/DidViewer'
import Config from '../screens/settings/Config' // *
import Messages from '../screens/settings/Messages'
import MessageDetail from '../screens/settings/MessageDetail'
import CreateCredential from '../screens/settings/CreateCredential' // *
import CreateRequest from '../screens/settings/CreateRequest'
import SendRequest from '../screens/settings/SendRequest'
import ShareCredential from '../screens/settings/ShareCredential'
import Connections from '../screens/settings/Connections' // *

import { Animated, Easing } from 'react-native'

const headerLogo = () => (
  <Image
    source={require('../assets/images/daf-black-icon.png')}
    style={{ height: 41 }}
    resizeMode={'contain'}
  />
)

const SettingsNavigator = createStackNavigator(
  {
    [Screens.Settings.screen]: {
      screen: Settings,
      navigationOptions: {
        title: i18n.t('Settings'),
      },
    },
    [Screens.ShowSecret.screen]: {
      screen: ShowSecret,
      navigationOptions: {
        title: i18n.t('Reveal Secret'),
      },
    },
    [Screens.Messages.screen]: {
      screen: Messages,
      navigationOptions: {
        title: i18n.t('Messages'),
      },
    },
    [Screens.MessageDetail.screen]: {
      screen: MessageDetail,
      navigationOptions: {
        title: i18n.t('Messages Detail'),
      },
    },
    [Screens.CreateCredential.screen]: {
      screen: CreateCredential,
      navigationOptions: {
        title: i18n.t('Create Credential'),
      },
    },
    [Screens.ShareCredential.screen]: {
      screen: ShareCredential,
      navigationOptions: {
        title: i18n.t('Share Credential'),
      },
    },
    [Screens.CreateRequest.screen]: {
      screen: CreateRequest,
      navigationOptions: {
        title: i18n.t('Create Request'),
      },
    },
    [Screens.SendRequest.screen]: {
      screen: SendRequest,
      navigationOptions: {
        title: i18n.t('Send Request'),
      },
    },
    [Screens.Connections.screen]: {
      screen: Connections,
      navigationOptions: {
        title: i18n.t('Connections'),
      },
    },
    [Screens.DidViewer.screen]: {
      screen: DidViewer,
      navigationOptions: {
        title: i18n.t('Connections'),
      },
    },
    [Screens.Signer.screen]: {
      screen: Signer,
      navigationOptions: {
        title: i18n.t('Signer'),
      },
    },
    [Screens.Config.screen]: {
      screen: Config,
      navigationOptions: {
        title: i18n.t('Configuration'),
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerTintColor: Colors.BLACK,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackTitle: null,
    },
  },
)

const ProfileNavigator = createSharedElementStackNavigator(
  createStackNavigator,
  {
    [Screens.ViewerProfile.screen]: {
      screen: ViewerProfile,
      navigationOptions: {
        title: i18n.t('My Profile'),
      },
    },
  },
)

const ActivityNavigator = createSharedElementStackNavigator(
  createStackNavigator,
  {
    [Screens.Activity.screen]: {
      screen: Activity,
      navigationOptions: {
        title: i18n.t('Activity'),
      },
    },
    [Screens.Profile.screen]: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Activity',
    defaultNavigationOptions: {
      headerTintColor: Colors.BLACK,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackTitle: null,
    },
  },
)

const ExploreNavigator = createStackNavigator(
  {
    [Screens.Explore.screen]: Explore,
  },
  {
    defaultNavigationOptions: {
      headerTintColor: Colors.BLACK,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackTitle: null,
    },
  },
)

const ScannerNavigator = createStackNavigator(
  {
    [Screens.Scanner.screen]: Scanner,
    [Screens.MessageProcess.screen]: MessageProcess,
  },
  {
    headerMode: 'none',
  },
)

const IssueCredential = createStackNavigator({
  IssueCredentialScreen,
})

const IssueFirstCredential = createStackNavigator({
  CreateFirstCredential,
})

/**
 * Main TabNavigator
 */
const TabNavigator = createBottomTabNavigator(
  {
    [Screens.Activity.screen]: {
      screen: ActivityNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <Icon icon={Icons.HEART} color={tintColor} />
        },
      },
    },
    [Screens.Explore.screen]: {
      screen: ExploreNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <Icon icon={Icons.SEARCH} color={tintColor} />
        },
      },
    },
    Scan: {
      screen: () => null,
      navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        tabBarOnPress: () => navigation.navigate('Scanner'),
        tabBarIcon: ({ tintColor }) => {
          return <Icon icon={Icons.SCAN} color={Colors.BRAND} />
        },
      }),
    },
    [Screens.Settings.screen]: {
      screen: SettingsNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <Icon icon={Icons.SETTINGS} color={tintColor} />
        },
      },
    },
    [Screens.ViewerProfile.screen]: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <TabAvatar tintColor={tintColor} />
        },
      },
    },
  },
  {
    initialRouteName: 'Activity',
    backBehavior: 'initialRoute',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: {
        light: Colors.DARK_GREY,
        dark: Colors.BRAND,
      },
    },
  },
)

/**
 * Remove modal animation from these screens
 */
const FADE_IN_MODALS = ['CredentialDetail']

let dynamicModalTransition = (
  transitionProps: any,
  prevTransitionProps: any,
) => {
  const notModal = FADE_IN_MODALS.some(
    screenName =>
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName),
  )
  return notModal
    ? fadeIn()
    : StackViewTransitionConfigs.ModalSlideFromBottomIOS
}

export function fadeIn(duration = 400) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ position, scene }: any) => {
      const { index } = scene

      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1],
      })

      return { opacity }
    },
  }
}

const CredentialDetail = createSharedElementStackNavigator(
  createStackNavigator,
  {
    Credential: {
      screen: Credential,
      navigationOptions: {
        headerStyle: { borderBottomWidth: 0, backgroundColor: '#000000' },
      },
    },
    SettingsDetail: Settings,
  },
)

const App = createSharedElementStackNavigator(
  createStackNavigator,
  {
    Tabs: TabNavigator,
    Request: Request,
    Requests: Requests,
    Scanner: ScannerNavigator,
    IssueFirstCredential,
    IssueCredential,
    CredentialDetail,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    transitionConfig: dynamicModalTransition,
  },
)

const Onboard = createStackNavigator(
  {
    Intro: {
      screen: Intro,
      navigationOptions: {
        headerTitle: headerLogo,
        headerStyle: { borderBottomWidth: 0 },
      },
    },
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        headerTitle: headerLogo,
        headerStyle: { borderBottomWidth: 0 },
      },
    },
    Restore: {
      screen: Restore,
      navigationOptions: {
        headerTitle: headerLogo,
        headerStyle: { borderBottomWidth: 0 },
      },
    },
    CreatingWallet: {
      screen: CreatingWallet,
      navigationOptions: {
        headerLeft: null,
        headerTitle: headerLogo,
        headerStyle: { borderBottomWidth: 0 },
      },
    },
    PerseidLogin: {
      screen: PerseidLogin,
      navigationOptions: {
        headerLeft: null,
        headerTitle: headerLogo,
        headerStyle: { borderBottomWidth: 0 },
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerLeft: null,
        headerTitle: headerLogo,
        headerStyle: { borderBottomWidth: 0 },
      },
    },
  },

  {
    //initialRouteName: 'Intro',
    //initialRouteName: 'PerseidLogin'
    initialRouteName: 'Login',
  },
)

const RootNavigator = createSwitchNavigator(
  {
    App,
    Onboard,
  },
  { initialRouteName: 'Onboard' },
)

export interface NavigationScreen {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export default createAppContainer(RootNavigator)
