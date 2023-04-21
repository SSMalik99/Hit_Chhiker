import { StyleSheet, Text, View, Dimensions, Pressable, Button, Alert } from 'react-native';

// import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { faLocation, faLocationPin } from '@fortawesome/free-solid-svg-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useTheme } from '../../Context/ThemeContext';
import { RidesView } from './RidesView';
import axios from 'axios';
import RideController from '../../Controller/RideContrller';

// import {`[Calendar](#calendar), [CalendarList](#calendarlist), [Agenda](#agenda)`} from 'react-native-calendars';


export default function Search() {

  const selectedTheme = useTheme()

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // from and to address
  const [fromAddress, setFromAddress] = useState<any>()
  const [toAddress, setToAddress] = useState<any>()

  const [postalCode, setPostalCode] = useState<any>()
  const [toPostalCode, setToPostalCode] = useState<any>()

  // check  user want a ride or giving a ride
  const [postRide, setPostRide] = useState(false)

  // setPlacesId
  const [fromPlaceId, setFromPlaceId] = useState<string | null>(null)
  const [toPlaceId, setToPlaceId] = useState<string | null>(null)

  // get rides form the api
  const [rides, setRides] = useState([])

  // get date if not current date will be applied
  const [date, setDate] = useState<Date | null>(null)

  const rideController = new RideController()



  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date)
    hideDatePicker();

  };



  const showEmptyAlert = () => {
    // Alert.alert("No Rides", "No Rides available for the searched query.")
  }

  const postMyRide = async () => {


    if (postRide) {
      const response = await rideController.createRide(fromAddress, toAddress, postalCode, toPostalCode, date ? date : new Date(), fromPlaceId, toPlaceId, postRide)
      if (!response?.success) {
        Alert.alert("Error", response?.message)
      }

      Alert.alert("Success", "Ride is created succesfully")

    } else {
      const response = await rideController.findRides(postalCode, toPostalCode, date)

      if (!response?.success) {
        Alert.alert("Error", response?.message)
      }

      console.log(response.rides.length)

      setRides(response.rides)

      // if (rides.length <= 0) {
      //   noRideAvailable()
      // }
    }

  }

  const updateFromAddress = async (data: any) => {
    setFromPlaceId(data?.place_id)

    let response = await rideController.getPlaceDetail(data?.place_id)

    if (!response.success) {
      Alert.alert("ERROR", response.message)
    } else {
      setPostalCode(response.postalCode)
      setFromAddress(response.address)
    }

  }

  const noRideAvailable = () => {
    Alert.alert("Info!", "No Ride available for the time being")

  }

  const updateToAddress = async (data: any) => {

    setToPlaceId(data?.place_id)
    let response = await rideController.getPlaceDetail(data?.place_id)

    if (!response.success) {
      Alert.alert("ERROR", response.message)
    } else {
      setToAddress(response.address)
      
      setToPostalCode(response.postalCode)
    }
  }


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
                updateFromAddress(details ?? data)
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
                updateToAddress(details ?? data)

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
                components: 'country:ca',

              }}
            />
          </View>


          <View style={{
            marginTop: 10,
            marginBottom: 10

          }}>


            <Text onPress={showDatePicker}
              style={
                {
                  width: 100,
                  textAlign: "center",
                  padding: 10,
                  color: selectedTheme?.blueText,


                }
              }
            >
              Select Date
            </Text>


            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              display='inline'
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>

          <BouncyCheckbox
            size={30}

            unfillColor={selectedTheme?.text}
            fillColor={selectedTheme?.main}
            text="You Have a car and you can provide ride to others.?"
            style={{
              marginLeft: 5
            }}
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={{
              textDecorationLine: "none",
              color: selectedTheme?.blackText

            }}

            onPress={(isChecked: boolean) => {
              setPostRide(isChecked)
            }}
          />

          <View style={{
            alignContent: 'center',
            alignItems: 'center'

          }}>
            <Pressable onPress={() => postMyRide()} style={
              {
                width: '60%',
                height: 50,
                marginTop: 10,

                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selectedTheme?.main,
              }
            }>
              <Text style={
                {
                  color: selectedTheme?.text
                }
              }>{postRide ? "Post" : "Find"} </Text>
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 20,
            }}>
            {/* <MapView style={styles.map} /> */}

          </View>

          {rides.length > 0 ?
            <ScrollView
              style={{
                backgroundColor: '#128892',
                marginTop: 10,
                borderRadius: 30,

              }}>
              {rides.map(ride => {

                return <View key={(new Date()).toTimeString() + "Clog" +( Math.random()*10 +10)}>

                <View
                  style={{
                    padding: 10,
                    marginTop: 10,
                    borderTopWidth: 2,
                    borderTopColor: 'white',
                    width: Dimensions.get("window").width
                  }}>

                  <Text style={styles.ride_text}>Contact Email : {ride?.contactEmail}</Text>


                  <View style={styles.ride_internal_row}>
                    
                    <Text style={{
                      ...styles.ride_text,
                      marginTop:20
                    }}>
                      Start Location:
                    </Text>
                  </View>
                  <View style={styles.ride_internal_row}>
                    
                    <Text style={styles.ride_text}>
                      {ride?.from}
                    </Text>
                  </View>


                  <View style={styles.ride_internal_row}>
                    
                    <Text style={{
                      ...styles.ride_text,
                      marginTop:20
                    }}>
                      End Location:
                    </Text>
                  </View>
                  <View style={styles.ride_internal_row}>
                    {/* <Text style={styles.ride_text}>To:</Text> */}
                    <Text style={styles.ride_text}>
                      {ride?.to}
                    </Text>
                  </View>

                  

                  <View style={styles.ride_internal_row}>
                    
                    <Text style={{
                      ...styles.ride_text,
                      marginTop:20
                    }}>
                      Ride Date
                    </Text>
                  </View>
                  <View style={styles.ride_internal_row}>
                    <View>
                      
                      <Text style={styles.ride_text}>{new Date(Date.parse(ride.date)).toLocaleString()}</Text>
                    </View>

                  </View>

                  <View style={styles.ride_internal_row}>
                    
                    <Text style={{
                      ...styles.ride_text,
                      marginTop:20
                    }}>
                      Contact Number
                    </Text>
                  </View>
                  <View style={styles.ride_internal_row}>
                    <View>
                      
                      <Text style={styles.ride_text}>{ride?.contactNumber}</Text>
                    </View>

                  </View>
                </View>
              </View>
              })}
            </ScrollView> : ""}



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
