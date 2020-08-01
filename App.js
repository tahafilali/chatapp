
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Messages from './screens/Messages';
import { NavigationContainer } from '@react-navigation/native';
import ChatScreen from './screens/ChatScreen';
import Main from './Main';
import {MaterialCommunityIcons,AntDesign,MaterialIcons} from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


export default class  App extends Component {
  render(){
    return (
    <Main/>
      );
  }
 
}


