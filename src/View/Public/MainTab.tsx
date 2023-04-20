import 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Search from '../Private/Search';
import Profile from '../Private/Profile';
import Setting from '../Private/Setting';

import Login, { userData } from './Login';
import { faGear, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import React, { useEffect, useState } from 'react';
import Signup from './Signup';
import Home from './Home';
import { ThemeContext, ThemeContextProvider } from '../../Context/ThemeContext';
import { AuthProvider, useAuthUser } from '../../Context/UserContext';
import { Appearance } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';





export default function MainTab() {

  // const currentUser = useAuthUser()?.currentUser

  const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(null)



  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])
  

  const Tab = createBottomTabNavigator();
  const MainStack = createNativeStackNavigator();

  const colorScheme = Appearance.getColorScheme();


  return (

    <AuthProvider value={currentUser}>
      <ThemeContextProvider value={colorScheme === "dark" ? "dark" : "light"}>
        <NavigationContainer>
          {!currentUser ? (

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
            </MainStack.Navigator>

          ) : (
            <Tab.Navigator initialRouteName="Search" screenOptions={{ headerShown: false }}>
              <Tab.Screen
                name="Search"
                options={{
                  title: 'Search Your Ride',
                  tabBarIcon: ({ color }) => (
                    <FontAwesomeIcon icon={faSearch} size={24} color={color} />
                  ),
                }}>
                {props => <Search />}
              </Tab.Screen>

              <Tab.Screen
                name="Profile"
                options={{
                  title: 'Profile',
                  tabBarIcon: ({ color }) => (
                    <FontAwesomeIcon icon={faUserCircle} size={24} color={color} />
                  ),
                }}>
                {props => <Profile />}
              </Tab.Screen>

              <Tab.Screen
                name={`Setting & Privacy`}
                options={{
                  title: 'Setting',
                  tabBarIcon: ({ color }) => (
                    <FontAwesomeIcon icon={faGear} size={24} color={color} />
                  ),
                }}>
                {props => <Setting />}
              </Tab.Screen>
            </Tab.Navigator>
          )}

        </NavigationContainer>

      </ThemeContextProvider>
    </AuthProvider>

  );
}


