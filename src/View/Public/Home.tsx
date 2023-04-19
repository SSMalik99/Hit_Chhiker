import {StyleSheet, Text, View, Image, Pressable} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AppFooter from '../../components/Footer';
import React from 'react';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';

export default function Home() {
 

  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.logo_container}>
          <Image
            style={styles.logo}
            source={require("../../../Assets/logo1.png")}
          />
        </View>

        <Pressable
          onPress={() => {
            navigation.navigate('Signup');
          }}
          style={styles.home_btn}>
          <Text style={styles.home_btn_text}>Get Started</Text>

          <FontAwesomeIcon 
            icon={faArrowRight} 
            color='white' 
            style={
              {
                marginLeft : 3,
                paddingTop: 2
              }
            } 
            size={16}
          />
        </Pressable>
      </View>

      <AppFooter />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  logo_container: {
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    alignContent: 'center',
  },
  home_btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 10,
    backgroundColor: '#128892',
    flexDirection: 'row',
  },
  home_btn_text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#ffffff',
    // fontFamily:'Abel_400Regular',
  },
});
