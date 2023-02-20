import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
} from "react-native";


// import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

import MapView from "react-native-maps";

export default function Search({ userData }) {
  const navigation = useNavigation();
  // loadAsync("Abel_400Regular").then((val) => {
  //   useFonts({
  //     val
  //   });
  // // })
  // useFonts({
  //   Abel_400Regular
  // })
  
  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView>
        {/* <AppHeader includeLogin={true} /> */}

        {/* main view of searching screen */}

        <View style={styles.wrapper}>
          <View testID="location_container">
            <View style={styles.search_container}>
              <Text>
                <Entypo name="location-pin" size={30} color="black" />
              </Text>
              <TextInput
                style={styles.search_input}
                placeholder="Search Start Location"
              />
            </View>

            <View style={styles.search_container}>
              <Text>
                <Entypo name="location" size={30} color="black" />
              </Text>
              <TextInput
                style={styles.search_input}
                placeholder="End Locatioin"
              />
            </View>

            <View
              style={{
                marginTop: 20,
              }}
            >
              <MapView style={styles.map} />
            </View>

            <ScrollView
              style={{
                backgroundColor: "#128892",
                marginTop: 10,
                borderRadius: 30,
                padding: 8,
              }}
            >
              <View>
                <View
                  style={{
                    padding: 2,
                  }}
                >
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
                </View>

                <View
                  style={{
                    padding: 2,
                    marginTop: 10,
                    borderTopWidth: 2,
                    borderTopColor: "white",
                  }}
                >
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: "#128892",
    // height: Dimensions.get("window").height,
  },
  wrapper: {
    justifyContent: "center",
    alignContent: "center",
    // color:"#ffffff",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 50,
    marginTop: 30,
  },
  search_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  search_input: {
    marginTop: 10,
    borderBottomWidth: 2,
    minWidth: "80%",
    maxWidth: "80%",
    overflow: "scroll",
    fontSize: 25,
    borderBottomColor: "#000000",
    // fontFamily: "Abel_400Regular",
  },
  map: {
    width: Dimensions.get("window").width,
    height: 400,
  },
  ride_text: {
    fontSize: 20,
    color: "#ffffff",
    // fontFamily: "Abel_400Regular",
  },
  ride_internal_row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
