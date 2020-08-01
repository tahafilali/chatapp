import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Messages from './screens/Messages';
import { NavigationContainer } from '@react-navigation/native';
import ChatScreen from './screens/ChatScreen';
import {MaterialCommunityIcons,AntDesign,MaterialIcons} from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

export default function Main() {
    return (
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#142A3B"/>
        <Tab.Navigator
                initialRouteName="Home"
                activeColor="#5574F7"
                inactiveColor="#1F3C53"
                barStyle={{ backgroundColor: '#1F3C53' }}
        >
          <Tab.Screen name="Home" component={Messages} options={{
            tabBarIcon: () => (
              <AntDesign name="home" color="#5574F7" size={26} />
            ),
          }} />
          <Tab.Screen name="Friends" component={Messages} options={{
            tabBarIcon: () => (
              <MaterialIcons name="people-outline" color="#5574F7" activeColor="red" size={26} />
            ),tabBarOptions: { showLabel: false }
          }} />
           <Tab.Screen name="Messages" component={Messages} options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="chat-outline" color="#5574F7" activeColor="red" size={26} />
            ),tabBarOptions: { showLabel: false }
          }} />
           <Tab.Screen name="Settings" component={ChatScreen} options={{
            tabBarIcon: () => (
              <MaterialIcons name="more-horiz" color="#5574F7" activeColor="red" size={26} />
            ),tabBarOptions: { showLabel: false }
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }