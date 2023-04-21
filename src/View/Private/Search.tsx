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
  const [fromPlaceId, setFromPlaceId] = useState()
  const [toPlaceId, setToPlaceId] = useState()

  // get rides form the api
  const [rides, setRides] = useState([])

  // get date if not current date will be applied
  const [date, setDate] = useState<Date>()

  const rideController = new RideController()



  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date : Date) => {
    setDate(date)
    hideDatePicker();

  };

  const showEmptyAlert = () => {
    // Alert.alert("No Rides", "No Rides available for the searched query.")
  }

  const postMyRide = () => {
    console.log(fromAddress, toAddress, postalCode, toPostalCode, date, fromPlaceId, toPlaceId, postRide)
  }

  const updateFromAddress = async (data : any) => {
    setFromAddress(data?.place_id)

    let response = await rideController.getPlaceDetail(data?.place_id)
    
    if (!response.success) {
      Alert.alert("ERROR", response.message)
    }else {
      setPostalCode(response.postalCode)
      setFromAddress(response.address)
    }
  }

  const updateToAddress = async (data : any) => {
    
    setToAddress(data?.place_id)
    let response = await rideController.getPlaceDetail(data?.place_id)
    
      if (!response.success) {
        Alert.alert("ERROR", response.message)
      }else {
        setToAddress(response.postalCode)
        setToAddress(response.address)
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


          <View style = {{
            marginTop:10,
            marginBottom: 10
            
          }}>


            <Text onPress={showDatePicker}  
              style={
                {
                  width:100,
                  textAlign:"center",
                  padding:10,
                  color:selectedTheme?.blueText,
                  

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

          {rides.length > 0 ? <RidesView rides={rides} /> : ""}
          


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
