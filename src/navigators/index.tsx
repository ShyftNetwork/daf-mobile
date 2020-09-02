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
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Icon, Container, Text } from '@kancha/kancha-ui'
import TabAvatar from './components/TabAvatar'
import { Colors, Icons } from '../theme'
import { Screens } from './screens'

// Main Screens
import Activity from '../screens/main/Activity'
import Explore from '../screens/main/Explore'
import ViewerProfile from '../screens/main/ViewerProfile'
import Profile from '../screens/main/Profile'
import Onboarding from '../screens/main/Onboarding'
import CreateProfile from '../screens/main/Onboarding/CreatePerseidProfile'
import ReviewProfile from '../screens/main/Onboarding/ReviewPerseidProfile'
import Restore from '../screens/main/Restore'
import Intro from '../screens/main/Intro'
import PerseidLogin from '../screens/main/PerseidLogin'
import Login from '../screens/main/Login'

import Scanner from '../screens/main/Scanner'
import MessageProcess from '../screens/main/MessageProcess'
import Request from '../screens/main/Request'
import Requests from '../screens/main/Requests/Requests'
import Credential from '../screens/main/Credential'
import CredentialView from '../screens/main/CredentialView'
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
import Credentials from '../screens/settings/Credentials' // *

import { Animated, Easing } from 'react-native'
import Passport from '../screens/main/Onboarding/Passport'
import DriversLicense from '../screens/main/Onboarding/DriversLicense'
import UtilityBill from '../screens/main/Onboarding/UtilityBill'
import MarriageCertificate from '../screens/main/Onboarding/MarriageCertificate'
import WorkPermit from '../screens/main/Onboarding/WorkPermit'
import HealthInsurance from '../screens/main/Onboarding/HealthInsurance'
import ProofOfEmployment from '../screens/main/Onboarding/ProofOfEmployment'
import ProfileSuccess from '../screens/main/Onboarding/ProfileSuccess'
import SetProfilePicture from '../screens/main/Onboarding/SetProfilePicture'
import PerseidProfile from '../screens/main/PerseidProfile'
import PerseidDocuments from '../screens/main/PerseidDocuments'

const headerLogo = () => (
  <Image
    source={require('../assets/images/daf-black-icon.png')}
    style={{ height: 41 }}
    resizeMode={'contain'}
  />
)

const defaultNavigationOptions = {
  defaultNavigationOptions: {
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerBackTitleVisible: false,
  },
}

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
    [Screens.Credentials.screen]: {
      screen: Credentials,
      navigationOptions: {
        title: i18n.t('Credentials'),
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
    ...defaultNavigationOptions,
  },
)

const ProfileNavigator = createStackNavigator({
  [Screens.ViewerProfile.screen]: {
    screen: ViewerProfile,
    navigationOptions: {
      title: i18n.t('My Profile'),
    },
  },
})

const ActivityNavigator = createStackNavigator(
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
    ...defaultNavigationOptions,
  },
)

const ExploreNavigator = createStackNavigator(
  {
    [Screens.Explore.screen]: Explore,
  },
  {
    ...defaultNavigationOptions,
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

const CredentialDetail = createStackNavigator({
  Credential: {
    screen: Credential,
    navigationOptions: {
      headerStyle: { borderBottomWidth: 0, backgroundColor: '#000000' },
    },
  },
  SettingsDetail: Settings,
})

const DeepLinkModal = createStackNavigator({
  DeepLinkModal: {
    screen: () => (
      <Container>
        <Text>Hello Modal</Text>
      </Container>
    ),
    navigationOptions: {
      headerStyle: { borderBottomWidth: 0, backgroundColor: '#000000' },
    },
  },
})

const App = createStackNavigator(
  {
    Tabs: TabNavigator,
    Request: Request,
    Requests: Requests,
    Scanner: ScannerNavigator,
    IssueFirstCredential,
    IssueCredential,
    CredentialDetail,
    CredentialView,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
)

const Onboard = createStackNavigator(
  {
    Intro: {
      screen: Intro,
    },
    Onboarding: {
      screen: Onboarding,
    },
    CreateProfile: {
      screen: CreateProfile,
    },
    ReviewProfile: {
      screen: ReviewProfile,
    },
    SetProfilePicture: {
      screen: SetProfilePicture,
    },
    PerseidProfile: {
      screen: PerseidProfile,
    },
    PerseidDocuments: {
      screen: PerseidDocuments,
    },
    Passport: {
      screen: Passport,
    },
    DriversLicense: {
      screen: DriversLicense,
    },
    UtilityBill: {
      screen: UtilityBill,
    },
    MarriageCertificate: {
      screen: MarriageCertificate,
    },
    WorkPermit: {
      screen: WorkPermit,
    },
    HealthInsurance: {
      screen: HealthInsurance,
    },
    ProofOfEmployment: {
      screen: ProofOfEmployment,
    },
    ProfileSuccess: {
      screen: ProfileSuccess,
    },
    Restore: {
      screen: Restore,
    },
    CreatingWallet: {
      screen: CreatingWallet,
    },
    PerseidLogin: {
      screen: PerseidLogin,
      navigationOptions: {
        // headerLeft: null,
        headerTitle: headerLogo,
        headerStyle: { borderBottomWidth: 0 },
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        // headerLeft: null,
        headerTitle: headerLogo,
        headerStyle: { borderBottomWidth: 0 },
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerTitle: headerLogo,
      headerBackTitleVisible: false,
      headerStyle: {
        borderBottomWidth: 0,
      },
    },
    // initialRouteName: 'Intro',
    //initialRouteName: 'PerseidLogin'
    initialRouteName: 'Login',
  },
)

const RootNavigator = createSwitchNavigator(
  {
    App: {
      screen: App,
      path: '',
    },
    Onboard,
  },
  { initialRouteName: 'Onboard' },
)

export interface NavigationScreen {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export default createAppContainer(RootNavigator)
