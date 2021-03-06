import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { TabView, SceneMap } from 'react-native-tab-view';


import Tronco from "./Tronco"
import Braccia from "./Braccia"
import Gambe from "./Gambe"
import { green } from 'ansi-colors';



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
      first: () => <Tronco navigation={this.props.navigation}/>,
      second: () => <Braccia navigation={this.props.navigation}/>,
      third: () => <Gambe navigation={this.props.navigation}/>
    })}
    onIndexChange={index => this.setState({ index })}
    initialLayout={{ width: Dimensions.get('window').width, height: 0}}
    
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
