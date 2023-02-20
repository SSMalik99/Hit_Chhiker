import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/FontAwesome";
import AppHeader from "../components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { loadAsync, useFonts } from "expo-font";

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: "#128892",
    // height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    backgroundColor: "#128892",
    alignItems: "center",
    justifyContent: "center",
  },

  logo_container: {
    backgroundColor: "white",
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 40,
  },

  logo: {
    height: 150,
    width: 150,
  },

  inputView: {
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
  },

  iconContainer: {
    height: 32,
    width: 32,
    marginTop: 12,
  },

  icon: {
    fontSize: 32,
  },

  userIcon: {
    fontSize: 28,
  },
  TextInput: {
    width: "100%",
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    // fontFamily:"Abel_400Regular"
  },

  btn_container: {
    flexDirection: "row",
    marginTop: 35,
  },

  link_btn: {
    height: 30,
    marginBottom: 30,
    marginLeft: 8,
    color: "white",
  },

  signup_button: {
    width: "60%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    // fontFamily:"Abel_400Regular"
  },

  signup_button_text: {
    // fontFamily:"Abel_400Regular"
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    marginLeft: 8,
  },

  text: {
    color: "white",
    // fontFamily:"Abel_400Regular"
  },

  login_button: {
    marginRight: 8,
    // fontFamily:"Abel_400Regular"
  },
});

export default function Signup() {
  // loadAsync("Abel_400Regular").then((val) => {
  // useFonts({
  //   Abel_400Regular
  // });
  // })
  const [username, setUsername] = useState<string>("");
  const [fullName, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [hidePassword, setPasswordHideFlag] = useState<boolean>(true);
  const [hideConfirmPassword, setConfirmPasswordHideFlag] =
    useState<boolean>(true);

  const navigation = useNavigation();
  const onSignup = () => {
    if (username && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert("Password and ConfirmPassword field should match");
        return;
      }
      navigation.navigate(
        "Login" as never,
        {
          fullName: fullName,
          username: username,
          email: email,
          phone: phone,
          password: password,
        } as never
      );
    } else {
      alert("Please fill up all the required fields");
    }
  };

  return (
    <SafeAreaView style={styles.main_container}>
      {/* <AppHeader includeLogin={false} /> */}
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.logo_container}>
            <Image
              style={styles.logo}
              source={require("../../assets/logo1.png")}
            />
          </View>
          <StatusBar style="auto" />
          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <Icon
                name="user-circle-o"
                style={[styles.icon, styles.userIcon]}
              ></Icon>
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder="Name"
              placeholderTextColor="#003f5c"
              onChangeText={(fullName) => setName(fullName)}
            />
          </View>
          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <Icon
                name="user-circle-o"
                style={[styles.icon, styles.userIcon]}
              ></Icon>
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              placeholderTextColor="#003f5c"
              onChangeText={(username) => setUsername(username)}
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <Icon
                name="envelope"
                style={[styles.icon, styles.userIcon]}
              ></Icon>
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <Icon name="phone" style={[styles.icon, styles.userIcon]}></Icon>
            </View>
            <TextInput
              style={styles.TextInput}
              keyboardType="numeric"
              placeholder="Phone Number"
              placeholderTextColor="#003f5c"
              onChangeText={(phone) => setPhone(phone)}
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <Icon name="lock" style={[styles.icon]}></Icon>
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={hidePassword}
              onChangeText={(password) => setPassword(password)}
            />
            <Icon
              name={hidePassword ? "eye" : "eye-slash"}
              onPress={() => setPasswordHideFlag(!hidePassword)}
            ></Icon>
          </View>

          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <Icon name="lock" style={[styles.icon]}></Icon>
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={hideConfirmPassword}
              onChangeText={(confirmPassword) =>
                setConfirmPassword(confirmPassword)
              }
            />
            <Icon
              name={hideConfirmPassword ? "eye" : "eye-slash"}
              onPress={() => setConfirmPasswordHideFlag(!hideConfirmPassword)}
            ></Icon>
          </View>

          <TouchableOpacity
            style={styles.signup_button}
            onPress={() => {
              onSignup();
              // navigation.reset({
              //     index:0,
              //     routes:[{name:"MainTab"}]
              // })
            }}
          >
            <Text style={styles.signup_button_text}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.btn_container}>
            <Text style={styles.text}>Already have an account?</Text>
            <TouchableOpacity>
              <Text
                style={[styles.link_btn, styles.login_button]}
                onPress={() => {
                  navigation.navigate("Login" as never);
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
