[![CircleCI](https://circleci.com/gh/uport-project/daf-mobile/tree/master.svg?style=svg&circle-token=20f8c7ddb44368e4eaa3cf5219a605c431384831)](https://circleci.com/gh/uport-project/daf-mobile/tree/master)
[![codecov](https://codecov.io/gh/uport-project/daf-mobile/branch/master/graph/badge.svg?token=ClBiPSu9Wu)](https://codecov.io/gh/uport-project/daf-mobile)

# Daf mobile

Daf mobile is a reference implementation for [Daf](https://github.com/uport-project/daf) framework and also the source code for `uPort Open` mobile app. `uPort Open` mobile app along with `Daf` will replace the current `uPort` app and legacy architecture. Full documentation coming soon.

## Setup

### Longer - Contributors (iOS)

If you will be contributing to this project you will need to install [bundler](https://bundler.io/) to manage ruby gems so the versions installed in the project stay consistent with our CI

Install Bundler (You do not need to be in the project directory for this command)

```bash
$ gem install bundler
```

From the root of the project directory run:

```bash
$ bundle install
```

This installs cocopods and fastlane into your project. From here we will always use the local version. The Gems are shared accross both iOS and Android so no need to install twice.

To install pods use:

```bash
$ yarn
$ cd ios && bundle exec pod install
```

### Setup specific for Android. Assuming that you jave Android SDK setup already

Create a local.properties in the android directory and add the line below. You may have to specify full path

sdk.dir = ~/Library/Android/sdk

Must also start the virtual device. NOTE: When you run the command `react-native run-android` it will start the local server so don't bother running the 'yarn start'. It will fail to run because port 8081 will be taken

### Quick - Non Contributors (iOS)

You can safely install pods directly without bundler. You will need to have cocopods installed globally on your machine.

```bash
$ yarn
$ cd ios && pod install
```

## Running locally

```bash
yarn start
```

in another terminal

```bash
$ react-native run-ios OR
$ react-native run-android
```

## Environment variables

[React-native-config](https://github.com/luggit/react-native-config) is being used for environment variables

Add variables to `.env`. You may want to replace your `.env` file during build time.

```
TGE_URI=https://custom.my-tgserver.com
TGE_WS_URI=wss://custom.my-tgserver.com
```

In code:

```jsx
import Config from 'react-native-config'

console.log(Config.ENV) // dev
```

To use a different env file set `ENVFILE` variable:

```
$ ENVFILE=.env.production react-native run-android
```

## Sentry

Sentry is set up. Add the correct configs to .env

### Developer Notes

In order to change the app name in app.json from 'DafMobile' to something else, manual changed in the app registry of Android and iOS. Normally this will be changed during react native create app command.
