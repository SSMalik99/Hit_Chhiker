import { Dimensions, StyleSheet, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

export const RidesView = ({rides : []}) => {
    return <ScrollView
            style={{
              backgroundColor: '#128892',
              marginTop: 10,
              borderRadius: 30,

            }}>
            <View>
              
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