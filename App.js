import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Login from './src/pages/Login';
import Home from './src/pages/Home';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


import { createStackNavigator } from 'react-navigation';

export const baseUrl = "http://192.168.42.204";
export const listExercise = "/Pallestra/script/listAvailableExercise.php";
export const loginurl = '/Pallestra/script/mobile/login.php';


export default createStackNavigator(
  {
    Login: Login,
    Home: Home

  },


  {
    initialRouteName: 'Home',

    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
  }
  });

export class App extends Component {

  render() {
    return (
      <View>

        <Login />

      </View>
    );
  }
}