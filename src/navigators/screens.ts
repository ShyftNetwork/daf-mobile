const OnboardingScreens = {
  Restore: { screen: 'Restore', title: 'Restore' },
  Intro: { screen: 'Intro', title: 'Intro' },
  CreatingWallet: { screen: 'CreatingWallet', title: 'Creating Wallet' },
  Onboarding: { screen: 'Onboarding', title: 'Onboarding' },
  CreateProfile: { screen: 'CreateProfile', title: 'Create New Profile' },
  PerseidLogin: { screen: 'PerseidLogin', title: 'Perseid Login' },
}

const MainScreens = {
  Activity: { screen: 'Activity', title: 'Activity' },
  Explore: { screen: 'Explore', title: 'Explore' },
  Settings: { screen: 'Settings', title: 'Settings' },
  ViewerProfile: { screen: 'ViewerProfile', title: 'Profile' },
  PerseidProfile: { screen: 'PerseidProfile', title: 'My PerseID Profile' },
  Profile: { screen: 'Profile', title: 'Profile' },
  Scanner: { screen: 'Scanner', title: 'Scanner' },
  IssueCredential: { screen: 'IssueCredential', title: 'Issue Credential' },
  Request: { screen: 'Request', title: 'Request' },
  Requests: { screen: 'Requests', title: 'Request' },
  CreateFirstCredential: {
    screen: 'CreateFirstCredential',
    title: 'Create First Credential',
  },
  Credential: { screen: 'Credential', title: 'Credential' },
}

const UserSettingScreens = {
  Security: { screen: 'Security', title: 'Security' },
  ShowSecret: { screen: 'ShowSecret', title: 'Reveal Secret' },
}

const DeveloperSettingsScreens = {
  Signer: { screen: 'Signer', title: 'Signer' },
  Config: { screen: 'Config', title: 'Config' },
  Crash: { screen: 'Crash', title: 'Crash Reporting' },
  MessageProcess: { screen: 'MessageProcess', title: 'Message Process' },
  Messages: { screen: 'Messages', title: 'Messages' },
  MessageDetail: { screen: 'MessageDetail', title: 'Message Detail' },
  CreateCredential: { screen: 'CreateCredential', title: 'Create Credential' },
  CreateRequest: { screen: 'CreateRequest', title: 'Create Request' },
  ShareCredential: { screen: 'ShareCredential', title: 'Share Credential' },
  SendRequest: { screen: 'SendRequest', title: 'Send Request' },
  Connections: { screen: 'Connections', title: 'Connections' },
  CredentialField: { screen: 'CredentialField', title: 'Credential Field' },
  DidViewer: { screen: 'DidViewer', title: 'DidViewer' },
  ModalDemo: { screen: 'ModalDemo', title: 'Modal Demo' },
  IdentitySelectModal: { screen: 'IdentitySelectModal', title: 'Identities' },
  Claim: { screen: 'Claim', title: 'Claim Demo' },
  DisclosureRequest: {
    screen: 'DisclosureRequest',
    title: 'Disclosure Request',
  },
  Credentials: { screen: 'Credentials', title: 'Credentials' },
}

export const Screens = {
  ...MainScreens,
  ...OnboardingScreens,
  ...UserSettingScreens,
  ...DeveloperSettingsScreens,
}
