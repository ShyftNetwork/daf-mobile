import React, { useState } from 'react'
import {
  StyleSheet,
  TextInput,
  ActivityIndicator,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Route,
  Redirect,
} from 'react-native'
import {
  Container,
  Text,
  Screen,
  Constants,
  Button,
  Modal,
} from '@kancha/kancha-ui'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { useMutation } from '@apollo/react-hooks'
import { SEND_JWT_MUTATION, SIGN_VC_MUTATION } from '../../lib/graphql/queries'
import { core } from '../../lib/setup'
import { Message } from 'daf-core'
import { useQuery } from '@apollo/react-hooks'
import { GET_VIEWER } from '../../lib/graphql/queries'

export default class App extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleEmail = text => {
    this.setState({ email: text })
  }

  handlePassword = text => {
    this.setState({ password: text })
  }

  login = (email, pass) => {
    console.log('email: ' + email + ' password: ' + pass)
    if (email === '' || pass === '') {
      alert('Please enter valid credentials')
    } else {
      //perform graphql login query to Perseid System
      //then forward to Intro.tsx
      //navigation.navigate('App')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.inputText}
            placeholder="Enter Account ID"
            onChangeText={text => this.setState({ email: text })}
          />
        </View>

        <View>
          <TextInput
            style={styles.inputText}
            // Adding hint in TextInput using Placeholder option.
            placeholder="Enter Password"
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
          />
        </View>

        <View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => this.login(this.state.email, this.state.password)}
          >
            <Text style={styles.submitButtonText}> Login </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text type={styles.bestText}>
            Enter your Perseid account and password
          </Text>
        </View>
      </View>
    )
  }
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

//export default PerseidLogin
