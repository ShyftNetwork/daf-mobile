/**
 *
 */
import React from 'react'
import {
  Container,
  Text,
  Screen,
  Button,
  Constants,
  Device,
} from '@kancha/kancha-ui'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { Colors } from '../../theme'
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Route,
  Redirect,
} from 'react-native'
import { useQuery } from 'react-apollo'
import { GET_MESSAGE, GET_VIEWER } from '../../lib/graphql/queries'
import { ActivityIndicator } from 'react-native'

const Login: React.FC<NavigationStackScreenProps> = ({ navigation }) => {
  console.log('Intro: ' + GET_VIEWER + '::' + navigation)
  // const { data, loading } = useQuery(GET_VIEWER, {
  //   onCompleted(response) {
  //     console.log("Working :: " + response)
  //     if (response.viewer !== null) {
  //       navigation.navigate('App')
  //     }
  //   },
  // })
  // let loading = true
  // const { data, loading } = useQuery(GET_VIEWER)

  // const { data, loading } = useQuery(GET_VIEWER, {
  //   variables: {
  //   },
  // })

  const { loading, error, data } = useQuery(GET_VIEWER)

  // if (!error && data.viewer !== null) {
  //   navigation.navigate('App')
  // }
  //, {
  //   onCompleted(response) {
  //     console.log("Working :: " + response)
  //     if (response.viewer !== null) {
  //       navigation.navigate('App')
  //     }
  //   },
  // })

  console.log(
    'loading :: ' +
      loading +
      ' :: error :: ' +
      error +
      ' :: data :: ' +
      (!data ? data : JSON.stringify(data)),
  )
  if (data && data.viewer !== null) {
    navigation.navigate('App')
  }

  const styles = StyleSheet.create({
    baseText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
    loginBtn: {
      backgroundColor: '#FF0000',
      borderRadius: 25,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 15,
    },
    container: {
      paddingTop: 23,
      flex: 1,
      backgroundColor: '#003f5c',
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    inputText: {
      height: 50,
      margin: 15,
      color: 'black',
      fontWeight: 'bold',
      fontSize: 18,
      backgroundColor: 'white',
      borderColor: '#7a42f4',
      borderWidth: 2,
    },
    inputView: {
      width: '80%',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      borderRadius: 25,
      height: 25,
      marginBottom: 20,
      justifyContent: 'center',
      padding: 20,
      flex: 1,
      flexDirection: 'column',
    },
  })

  var state = {
    email: '',
    password: '',
  }

  const handleEmail = (text: any) => {
    state.email = text
    console.log(state.email)
  }

  const handlePassword = (text: any) => {
    state.password = text
    console.log(state.password)
  }

  const login = (email: any, pass: any) => {
    console.log('email: ' + email + ' password: ' + pass)
    navigation.navigate('Onboarding')
    // if (email === '' || pass === '') {
    //   alert('Please enter valid credentials')
    // } else {
    //   //perform graphql login query to Perseid System
    //   //then forward to Intro.tsx
    //   //navigation.navigate('App')
    // }
  }

  const newUser = () => {
    console.log('newUser')
    navigation.navigate('CreateProfile')
    // if (email === '' || pass === '') {
    //   alert('Please enter valid credentials')
    // } else {
    //   //perform graphql login query to Perseid System
    //   //then forward to Intro.tsx
    //   //navigation.navigate('App')
    // }
  }

  const hasNoIdentityAndNotLoading =
    !loading && (!data || (data && data.viewer === null))
  // const hasNoIdentityAndNotLoading = true;//!loading && data && data.viewer === null

  return (
    <Screen
      safeAreaBottom={true}
      safeAreaBottomBackground={Colors.WHITE}
      background={'primary'}
      footerComponent={
        hasNoIdentityAndNotLoading && (
          <Container
            paddingHorizontal={true}
            paddingBottom={true}
            backgroundColor={Colors.WHITE}
          >
            <Container alignItems={'center'}>
              <Container w={300}>
                <Button
                  fullWidth
                  block={Constants.ButtonBlocks.Outlined}
                  type={Constants.BrandOptions.Primary}
                  buttonText={'Login'}
                  //onPress={() => navigation.navigate('Onboarding')}
                  onPress={() => login(state.email, state.password)}
                />
              </Container>
            </Container>
            <Container alignItems={'center'}>
              <Container w={300}>
                <Button
                  fullWidth
                  block={Constants.ButtonBlocks.Outlined}
                  type={Constants.BrandOptions.Primary}
                  buttonText={'New User'}
                  //onPress={() => navigation.navigate('Onboarding')}
                  onPress={() => newUser()}
                />
              </Container>
            </Container>
          </Container>
        )
      }
    >
      {loading && (
        <Container flex={1} alignItems={'center'} justifyContent={'center'}>
          <ActivityIndicator size={'large'} />
          <Text textStyle={{ fontSize: 12 }}>Powered By</Text>
        </Container>
      )}
      {hasNoIdentityAndNotLoading && (
        <Container testID={'ONBOARDING_WELCOME_TOP'}>
          <Container padding alignItems={'center'} marginTop={50}>
            <Text type={Constants.TextTypes.H2} bold>
              Welcome to Perseid DiD Wallet
            </Text>
            <Text type={styles.baseText}>
              Please enter your Perseid credentials
            </Text>
          </Container>
          <View>
            <TextInput
              style={styles.inputText}
              placeholder="Enter Account ID"
              //onChangeText={text => handleEmail({ email: text })}
              // ref="emailval"
            />
          </View>

          <View>
            <TextInput
              style={styles.inputText}
              // Adding hint in TextInput using Placeholder option.
              placeholder="Enter Password"
              secureTextEntry={true}
              onChangeText={text => handlePassword({ password: text })}
            />
          </View>

          <Container padding alignItems={'center'} marginTop={50}>
            <Text type={Constants.TextTypes.Body}>
              Building trust with the Bermuda Government
            </Text>
          </Container>
        </Container>
      )}
    </Screen>
  )
}

export default Login
