import 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Search from './Search';
import Profile from './Profile';
import Setting from './Setting';

import {userData} from './Login';
import {faGear, faSearch} from '@fortawesome/free-solid-svg-icons';
import {faUserCircle} from '@fortawesome/free-regular-svg-icons';
import React from 'react';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  const route: any = useRoute();

  let userData: userData = route.params;

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Search"
        options={{
          title: 'Search Your Ride',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faSearch} size={24} color={color} />
          ),
        }}>
        {props => <Search {...props} userData={userData} />}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faUserCircle} size={24} color={color} />
          ),
        }}>
        {props => <Profile {...props} userData={userData} />}
      </Tab.Screen>

      <Tab.Screen
        name={`Setting & Privacy`}
        options={{
          title: 'Setting',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faGear} size={24} color={color} />
          ),
        }}>
        {props => <Setting {...props} userData={userData} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
