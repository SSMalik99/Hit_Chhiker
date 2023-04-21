import {StyleSheet, Text, View, Dimensions, Pressable, TouchableOpacity, Platform, Alert} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope, faUserCircle} from '@fortawesome/free-regular-svg-icons';
import {faCar, faPencil, faPhone} from '@fortawesome/free-solid-svg-icons';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import { useAuthUser } from '../../Context/UserContext';
import UserController from '../../Controller/UserController';
import { useTheme } from '../../Context/ThemeContext';
import { Button } from '@ant-design/react-native';

export default function Profile() {

  // 
  const currentUser = useAuthUser()
  
  // user controller for the interaction with database
  const userController = new UserController()


  const theme = useTheme()

  let intialBio = ""


  const [phoneNumber, setPhoneNumber] = useState( "Loading...")
  const [bio, setBio] = useState("Write about youself")
  const [takenRides, setTakenRides] = useState(0)
  const [givenRides, setGivenRides] = useState(0)
  


  const updateBio = async () => {

    let res = await userController.updateBio(bio)
    // show alert message with the response from the database
    if(!res.success) {
      Alert.alert("Error", res.message)
    }else {
      Alert.alert("Success", res.message)
    }

  }



  // find the user deatil when page is goint to render first time
  useEffect( () => {

    // lcoal funciton to find data from mongodb 
    const findUser = async () => {
      const user = await userController.getUserFromDb() // get user from mongo db
      const rideData = await userController.getTotalRidesForUser() // get total rides for the user

      setPhoneNumber(user?.phoneNumber) // use hook to set up the phone number
      setBio(user?.bio) // set bio for the user by using the hook

      setTakenRides(rideData.requestedRide)
      setGivenRides(rideData.totalRides)
      console.log(takenRides, givenRides)

      intialBio = user?.bio
    }

    findUser()

  }, [])




  
console.log(phoneNumber)

  return (

    <SafeAreaView style={styles.main_container}>
      <ScrollView>
        {/* <AppHeader includeLogin={false} /> */}

        <View style={styles.main_wrapper}>
          {/* <View style={styles.ride_external_row_icon}>
            <FontAwesomeIcon icon={faUserCircle} size={28} />
          </View> */}
          <View style={styles.ride_external_row1}>
            <Text style={styles.ride_text2}>{currentUser?.displayName} </Text>
          </View>
          <View style={styles.ride_external_row1}>
            <Text style={styles.ride_text2}>About:</Text>
          </View>
          <View>
            <View style={styles.bio_text}>
              <TextInput
                multiline
                onChangeText={value => setBio(value)}
                value={bio}
                cursorColor={theme?.text} 
                selectionColor={theme?.text} 
                placeholderTextColor={theme?.text} 
                autoCorrect={false}
                autoCapitalize='none' 
                style = {{
                  color:theme?.text,
                  padding: 20 
                }}
                placeholder='Write somethig about yourself.....' 
                  / >
                  
                
                
            </View>
            <TouchableOpacity onPress={() => updateBio()}   style={
                  {
                    marginTop:10,
                    height: 50,
                    width : 100,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                  }
                
                }><Text >Update</Text></TouchableOpacity>

          </View>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.ride_external_row}>
            <Text style={styles.ride_text}>Contact Information:</Text>
            <FontAwesomeIcon icon={faPencil} size={28} />
          </View>

          <View style={styles.ride_external_row}>
            <FontAwesomeIcon icon={faPhone} size={28} />
            <View>
              <Text  style={styles.ride_text}>
                {phoneNumber}
              </Text>
            </View>
          </View>
          <View style={styles.ride_external_row}>
            <FontAwesomeIcon icon={faWhatsapp} size={28} />
            <View>
              <Text style={styles.ride_text}>{phoneNumber}</Text>
            </View>
          </View>
          <View style={styles.ride_external_row}>
            <FontAwesomeIcon icon={faEnvelope} size={28} />
            <View>
              <Text style={styles.ride_text}>{currentUser?.email}</Text>
            </View>
          </View>
          <View style={styles.ride_external_row}>
            <FontAwesomeIcon icon={faCar} size={28} />
            <View>
              <Text style={styles.ride_text}>Rides:</Text>
              <View style={
                {
                  marginLeft: 10
                }
              }>
                <View><Text>Given : {givenRides?? 0}</Text></View>
                <View><Text>Taken : {takenRides ?? 0}</Text></View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: '#128892',
    // height: Dimensions.get('window').height
  },
  wrapper: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    height: Dimensions.get('window').height,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginTop: 70,
    paddingStart: 15,
    paddingTop: 30,
  },
  main_wrapper: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    paddingStart: 30,
    paddingTop: 20,
  },

  icon: {
    paddingStart: 150,
    fontSize: 22,
  },
  icon2: {
    fontSize: 70,
  },

  userIcon: {
    fontSize: 35,
    marginEnd: 30,
  },
  ride_text: {
    fontSize: 20,
    color: '#000000',
    marginLeft:4
    // fontFamily:"Abel_400Regular",
  },

  bio_text : {
    minWidth : Dimensions.get("window").width/1.2,
    maxWidth : Dimensions.get("window").width/1.2,
    borderWidth : 1,
    marginTop : 4,
    marginRight:4,
    borderColor:"#ffffff",
    borderRadius: 4
  },

  ride_text1: {
    fontSize: 15,
    color: '#000000',
    // fontFamily:"Abel_400Regular",
  },
  ride_text2: {
    fontSize: 25,
    color: '#ffffff',
    // fontFamily:"Abel_400Regular",
  },
  ride_text3: {
    fontSize: 17,
    color: '#ffffff',
    // fontFamily:"Abel_400Regular",
  },
  ride_external_row_icon: {
    flexDirection: 'row',
  },
  ride_external_row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 20,
    marginStart: 20,
  },
  ride_external_row1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  ride_internal_row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginStart: 60,
  },
  ride_top_row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 20,
    marginStart: 0,
  },
});
