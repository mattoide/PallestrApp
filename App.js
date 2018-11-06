import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Login from './src/pages/Login';
import Home from './src/pages/Home';
import MiaHome from './src/pages/miascheda/MiaHome';


import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Warning: Can\'t call', 'Possible Unh']);


import { createStackNavigator } from 'react-navigation';

export const baseUrl = "http://192.168.1.11"; 
//export const baseUrl = "http://ehpink.drink-web.eu";  
export const listExercise = "/Pallestra/script/listAvailableExercise.php";
export const listMyExercise = "/Pallestra/script/getMuscles.php";

export const loginurl = '/Pallestra/script/mobile/login.php';
export const addexercisescript = '/Pallestra/script/mobile/addExercise.php';
export const removeexercisescript = '/Pallestra/script/mobile/removeExercise.php';

 


export default createStackNavigator(
  {
    Login: Login,
    Home: Home,
    MiaHome: MiaHome

  },


  {
    initialRouteName: 'Login',

    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
  }
  });


/*
export class App extends Component {

  render() {
    return (
      <View>

        <Login />

      </View>
    );
  }
}*/