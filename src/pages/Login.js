import React, { Component } from 'react';
import { TextInput, View, Button, StyleSheet, Text, ToastAndroid, AsyncStorage } from 'react-native';
import { baseUrl, loginurl } from '../../App';


export default class Login extends Component {


  constructor(props) {
    super(props);

    this.state = {

      message: "",
      resp: "",
      nickname: "",
      password: "",

      user: { 
        nickname: ""
      }
      
    }; 
  }

componentDidMount() {
  this.state.nickname = ''
}

  render() {

    this.state.message = this.props.navigation.getParam('message', '')

    return (

      <View style={styles.view}>

        <TextInput
          placeholder="Username"
          onChangeText={(input) => this.state.nickname = input}
        />

        <TextInput
          placeholder="Password"
          onChangeText={(input) => this.state.password = input}
          secureTextEntry={true}    
              />

        <View style={styles.login}>
          <Button
            onPress={() => this.login()}
            title="Login"
            color="black"
          />
        </View>

  

        {/*<Button
          onPress={() => this.prova()}
          title="PROVA"
          color="black"
        />*/}



        <View >
          <Text style={styles.res}>
            {this.state.message}
          </Text>
        </View>

      </View>
    );
  }

 async prova() { 

    console.log("PROVA")   
 
    /*
    try { 
       AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
    } catch (error) {
      // Error saving data
    }
    
    try { 
      const value =  AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null){
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }

*/


    try {
    await  AsyncStorage.setItem('nickname', "this.state.password");

      const value = await AsyncStorage.getItem('nickname');


      if (value !== null) {
        console.log(value);
      }
    } catch (error) {
    }

  }

  login() {

    return fetch(baseUrl + loginurl, {

      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },

    /*  body: JSON.stringify({

        username: this.state.nickname,
        password: this.state.password

      }),*/

      body: "username=" + this.state.nickname + "&" + "password=" + this.state.password // <-- Post parameters

    })

      .then((response) => {


        if (response.status != 200) {

          response.text().then(

            (obj) => {

              this.setState({ resp: obj });
              this.setState({ user: "" });

              ToastAndroid.showWithGravity(
                this.state.resp,
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );



            });

        } else {

          response.json()
            .then((responseJson) => {


              this.setState({ user: responseJson });
              this.setState({ resp: "" });

              console.log(this.state.user)

              try {
                AsyncStorage.setItem('password', this.state.password);
                AsyncStorage.setItem('nickname', this.state.user.nickname); 

                this.props.navigation.navigate('MiaHome');

              } catch (error) {
              }



            })
        }
      }).catch((error) => {
        console.error(error);
      });
  }



}



const styles = StyleSheet.create({

  view: {

    marginTop: '50%'
  },
  login: {
    marginBottom: '10%'
  },
  res: {
    color: "green",
    textAlign: "center",
    marginTop: '2%',
    fontSize: 30

  }
});