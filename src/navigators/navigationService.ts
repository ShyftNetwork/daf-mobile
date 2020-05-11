import { NavigationActions } from 'react-navigation'

let _navigator: any

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef
  console.log('navigationService: ' + _navigator)
}

function navigate(routeName: any, params: any) {
  console.log('routeName: ' + routeName)

  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  )
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
}
