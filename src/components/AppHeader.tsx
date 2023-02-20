import { Entypo } from "@expo/vector-icons";
import { Pressable, View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import React, { ReactPropTypes } from "react";

const AppHeader = ({ includeLogin }) => {
  const navigation = useNavigation();
  const route = useRoute();

  return includeLogin !== true ? (
    <View style={styles.head}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Entypo name="menu" size={44} color="white" />
        </Pressable>
        <Text
          style={{
            color: "#ffffff",
            marginLeft: 3,
            fontSize: 25,
            fontFamily: "Abel_400Regular",
          }}
        >
          {route.name}
        </Text>
      </View>
    </View>
  ) : (
    <View style={styles.head}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Entypo name="menu" size={44} color="white" />
        </Pressable>

        <Text
          style={{
            color: "#ffffff",
            marginLeft: 3,
            fontSize: 25,
            fontFamily: "Abel_400Regular",
          }}
        >
          {route.name}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems:"center"
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.header_link}>Login</Text>
        </Pressable>

        <Text
          style={{
            marginHorizontal: 8,
          }}
        >
          |
        </Text>

        <Pressable
          onPress={() => {
            navigation.navigate("Sign up");
          }}
        >
          <Text style={styles.header_link}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  head: {
    backgroundColor: "#128892",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignContent: "center",
  },
  header_link: {
    color: "#ffffff",
    fontFamily: "Abel_400Regular",
  },
});
export default AppHeader;
