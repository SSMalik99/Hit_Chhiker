import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import Icon from "@expo/vector-icons/FontAwesome";
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
// import { loadAsync, useFonts } from "expo-font";
import {FontAwesomeIcon as Icon} from '@fortawesome/react-native-fontawesome';
import {validateEmail} from '../helpers';
import {UserAuthentication} from '../models/user.model';
import {signUpUser} from '../services/user.service';

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: '#128892',
    // height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    backgroundColor: '#128892',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo_container: {
    backgroundColor: 'white',
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
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
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
    width: '100%',
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    // fontFamily:"Abel_400Regular"
  },

  btn_container: {
    flexDirection: 'row',
    marginTop: 35,
  },

  link_btn: {
    height: 30,
    marginBottom: 30,
    marginLeft: 8,
    color: 'white',
  },

  signup_button: {
    width: '60%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
    color: 'white',
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
  const [username, setUsername] = useState<string>('');
  const [fullName, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [hidePassword, setPasswordHideFlag] = useState<boolean>(true);
  const [hideConfirmPassword, setConfirmPasswordHideFlag] =
    useState<boolean>(true);
  const navigation = useNavigation();
  const onSignup = () => {
    if (username && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        Alert.alert('Password and ConfirmPassword field should match');
        return;
      }

      if (!validateEmail(email)) {
        Alert.alert('Please enter a valid email');
        return;
      }

      // Assign signup data to UserAuthentiocation type variable
      const signupData: UserAuthentication = {
        username: email,
        password: password,
      };

      // Function to perform signup
      signUpUser(signupData)
        .then(() => {
          console.log('User account created!');
          Alert.alert('Success, please login');
          navigation.goBack();
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
          Alert.alert(error);
        });
      navigation.navigate(
        'Login' as never,
        {
          fullName: fullName,
          username: username,
          email: email,
          phone: phone,
          password: password,
        } as never,
      );
    } else {
      Alert.alert('Please fill up all the required fields');
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
              source={require('../../assets/logo1.png')}
            />
          </View>
          <StatusBar style="auto" />
          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <Icon
                name="user-circle-o"
                style={[styles.icon, styles.userIcon]}
              />
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder="Name"
              placeholderTextColor="#003f5c"
              onChangeText={value => setName(value)}
            />
          </View>
          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <Icon
                name="user-circle-o"
                style={[styles.icon, styles.userIcon]}
              />
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              placeholderTextColor="#003f5c"
              onChangeText={value => setUsername(value)}
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <Icon name="envelope" style={[styles.icon, styles.userIcon]} />
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={value => setEmail(value)}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <Icon name="phone" style={[styles.icon, styles.userIcon]} />
            </View>
            <TextInput
              style={styles.TextInput}
              keyboardType="numeric"
              placeholder="Phone Number"
              placeholderTextColor="#003f5c"
              onChangeText={value => setPhone(value)}
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <Icon name="lock" style={[styles.icon]} />
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={hidePassword}
              onChangeText={value => setPassword(value)}
            />
            <Icon
              name={hidePassword ? 'eye' : 'eye-slash'}
              onPress={() => setPasswordHideFlag(!hidePassword)}
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <Icon name="lock" style={[styles.icon]} />
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={hideConfirmPassword}
              onChangeText={confirmPassword =>
                setConfirmPassword(confirmPassword)
              }
            />
            <Icon
              name={hideConfirmPassword ? 'eye' : 'eye-slash'}
              onPress={() => setConfirmPasswordHideFlag(!hideConfirmPassword)}
            />
          </View>

          <TouchableOpacity
            style={styles.signup_button}
            onPress={() => {
              onSignup();
              // navigation.reset({
              //     index:0,
              //     routes:[{name:"MainTab"}]
              // })
            }}>
            <Text style={styles.signup_button_text}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.btn_container}>
            <Text style={styles.text}>Already have an account?</Text>
            <TouchableOpacity>
              <Text
                style={[styles.link_btn, styles.login_button]}
                onPress={() => {
                  navigation.navigate('Login' as never);
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
