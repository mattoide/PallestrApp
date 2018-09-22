/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Dimensions
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MioTronco from "./MioTronco"
import MieBraccia from "./MieBraccia"
import MieGambe from "./MieGambe"




export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Tronco' },
        { key: 'second', title: 'Braccia' },
        { key: 'third', title: 'Gambe' },
      ],
    };
  }


render() {
  
  return (
    <TabView
    navigationState={this.state}
    renderScene={SceneMap({
      first: () => <MioTronco navigation={this.props.navigation}/>,
      second: () => <MieBraccia navigation={this.props.navigation}/>,
      third: () => <MieGambe navigation={this.props.navigation}/>
    })}
    onIndexChange={index => this.setState({ index })}
    initialLayout={{ width: Dimensions.get('window').width, height:0 }}
  />
  );
} 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
