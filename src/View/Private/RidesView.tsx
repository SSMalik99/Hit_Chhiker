import { Dimensions, StyleSheet, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

export const RidesView = ({rides : []}) => {
    return 
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