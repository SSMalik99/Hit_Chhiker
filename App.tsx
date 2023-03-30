import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/Screens/Home';
import Login from './src/Screens/Login';
import Signup from './src/Screens/Signup';

import {NavigationContainer} from '@react-navigation/native';
import MainTab from './src/Screens/MainTab';
import React from 'react';

// const Drawer = createDrawerNavigator()

const MainStack = createNativeStackNavigator();

export default function App() {
  // loadAsync("Abel_400Regular").then((font)=> console.log(font))

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen name="Home" component={Home} options={{}} />

        <MainStack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
          }}
        />
        <MainStack.Screen
          name="Signup"
          component={Signup}
          options={{
            title: 'Sign Up',
          }}
        />
        <MainStack.Screen
          name="MainTab"
          component={MainTab}
          options={{
            title: 'Search Your Ride',
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
