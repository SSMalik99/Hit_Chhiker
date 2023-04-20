import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';

// import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import MapView from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { faLocation, faLocationPin } from '@fortawesome/free-solid-svg-icons';

import WebView from 'react-native-webview';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Input from '@ant-design/react-native/lib/input-item/Input';
import { Checkbox, InputItem } from '@ant-design/react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useTheme } from '../../Context/ThemeContext';


export default function Search() {

  const selectedTheme = useTheme()


  return (
    <SafeAreaView style={styles.main_container}>


      {/* <AppHeader includeLogin={true} /> */}

      {/* main view of searching screen */}

      <View style={styles.wrapper}>

        <View testID="location_container">

          <View style={styles.search_container}>

            <Text>
              <FontAwesomeIcon icon={faLocationPin} size={30} color="black" />
            </Text>


            <GooglePlacesAutocomplete
              placeholder='Start Location'
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }}

              styles={
                {
                  textInput: styles.search_input,
                  textInputContainer: styles.search_container
                }
              }
              query={{
                key: "AIzaSyA04lIksf061PPNP_Z7-jCwxQCKbEwEXTQ",
                language: 'en',
              }}
            />

            {/* //key: "AIzaSyA04lIksf061PPNP_Z7-jCwxQCKbEwEXTQ", */}



          </View>

          <View style={styles.search_container}>
            <Text>
              <FontAwesomeIcon icon={faLocation} size={30} color="black" />
            </Text>
            <GooglePlacesAutocomplete
              placeholder='End Location'
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, "\n\n\n", details);
              }}
              styles={
                {
                  textInput: styles.search_input,
                  textInputContainer: styles.search_container
                }
              }
              query={{
                key: "AIzaSyA04lIksf061PPNP_Z7-jCwxQCKbEwEXTQ",
                language: 'en',
              }}
            />
          </View>

          
          <BouncyCheckbox
            size={30}
          
            unfillColor={selectedTheme?.text}
            fillColor={selectedTheme?.main}
            text="You Have a car and you can provide ride to others.?"
            style={{
              marginLeft:5
            }}
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={{
              textDecorationLine:"none",
              color:selectedTheme?.blackText
              
            }}
            
            onPress={(isChecked: boolean) => { }}
          />

        <View style={{
          alignContent:'center',
          alignItems:'center'
          
        }}>
          <Pressable onPress={() => {}} style={
            {
              width: '60%',
              height: 50,
              marginTop:10,
              
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: selectedTheme?.main,
            }
          }>
            <Text style={
              {
                color:selectedTheme?.text
              }
            }>Post </Text>
          </Pressable>
          </View>
          <View
            style={{
              marginTop: 20,
            }}>
            {/* <MapView style={styles.map} /> */}

          </View>

          <ScrollView
            style={{
              backgroundColor: '#128892',
              marginTop: 10,
              borderRadius: 30,

            }}>
            <View>

              {/* <View
                style={{
                  padding: 2,
                }}>
                <Text style={styles.ride_text}>User Name : John</Text>

                <View style={styles.ride_internal_row}>
                  <Text style={styles.ride_text}>Ride:</Text>
                  <Text style={styles.ride_text}>
                    Scarborough to Mississauga
                  </Text>
                </View>

                <View style={styles.ride_internal_row}>
                  <Text style={styles.ride_text}>Distance:</Text>
                  <Text style={styles.ride_text}>
                    66.5 km via Ontario 407
                  </Text>
                </View>

                <View style={styles.ride_internal_row}>
                  <View>
                    <Text style={styles.ride_text}>Date:</Text>
                    <Text style={styles.ride_text}>DD/MM//YYYY</Text>
                  </View>
                  <View>
                    <Text style={styles.ride_text}>Time:</Text>
                    <Text style={styles.ride_text}>7:00 Amm</Text>
                  </View>
                </View>
              </View> */}

              <View
                style={{
                  padding: 10,
                  marginTop: 10,
                  borderTopWidth: 2,
                  borderTopColor: 'white',
                  width: Dimensions.get("window").width
                }}>
                <Text style={styles.ride_text}>User Name : John Junior</Text>

                <View style={styles.ride_internal_row}>
                  <Text style={styles.ride_text}>Ride:</Text>
                  <Text style={styles.ride_text}>
                    Scarborough to Mississauga
                  </Text>
                </View>

                <View style={styles.ride_internal_row}>
                  <Text style={styles.ride_text}>Distance:</Text>
                  <Text style={styles.ride_text}>
                    66.5 km via Ontario 407
                  </Text>
                </View>

                <View style={styles.ride_internal_row}>
                  <View>
                    <Text style={styles.ride_text}>Date:</Text>
                    <Text style={styles.ride_text}>DD/MM//YYYY</Text>
                  </View>
                  <View>
                    <Text style={styles.ride_text}>Time:</Text>
                    <Text style={styles.ride_text}>8:00 Amm</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>


        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: '#128892',
    // height: Dimensions.get("window").height,
  },
  wrapper: {
    justifyContent: 'center',
    alignContent: 'center',
    // color:"#ffffff",
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    marginTop: 30,
  },
  search_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  search_input: {
    marginTop: 10,
    borderBottomWidth: 2,
    minWidth: '90%',
    maxWidth: '90%',
    overflow: 'scroll',
    fontSize: 25,
    borderBottomColor: '#000000',
    // fontFamily: "Abel_400Regular",
  },
  map: {
    width: Dimensions.get('window').width,
    height: 400,
  },
  ride_text: {
    fontSize: 20,
    color: '#ffffff',
    // fontFamily: "Abel_400Regular",
  },
  ride_internal_row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
