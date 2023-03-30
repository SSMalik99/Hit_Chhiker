import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {signIn} from '../services/user.service';
import {UserAuthentication} from '../models/user.model';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import {faLock, faUserCircle} from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: '#128892',
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    backgroundColor: '#128892',
    alignItems: 'center',
    justifyContent: 'center',
    // fontFamily:"Abel_400Regular"
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
    marginRight: 8,
    // fontFamily:"Abel_400Regular"
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    marginLeft: 8,
    // fontFamily:"Abel_400Regular"
  },

  loginBtn: {
    width: '60%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  loginBtnText: {
    // fontFamily:"Abel_400Regular"
  },
});

export interface userData {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setPasswordHideFlag] = useState(true);
  const navigation = useNavigation();

  const onLogin = () => {
    if (!email && !password) {
      Alert.alert('Please enter username and password to login');
      return;
    }

    // Assign login data to UserAuthentiocation type variable
    const loginData: UserAuthentication = {
      username: email,
      password: password,
    };

    signIn(loginData)
      .then(() => {
        console.log('LogIn Success');
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'MainTab',
              params: {email, password},
            },
          ],
        });
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  // const onLogin = () => {
  //   if(!email && !password) {
  //     alert('Please enter username and password to login')
  //     return
  //   }

  //   // whether user is re
  //   let mockedUser = checkMockedUser(email, password)

  //   if (
  //     (
  //       (email === route?.params?.email ||
  //         email === route?.params?.username
  //         )&&
  //       password === route?.params?.password
  //       && mockedUser == undefined
  //     ) || mockedUser != undefined) {

  //     let userData = {}

  //     if (mockedUser != undefined) {
  //       userData = mockedUser

  //     }else {
  //       userData = {
  //         fullName: route?.params?.fullName,
  //         username: route?.params?.username,
  //         email: route?.params?.email,
  //         phone: route?.params?.phone
  //       }
  //     }
  //     navigation.reset({
  //       index:0,
  //       routes:[
  //         {
  //           name:"MainTab",
  //           params:userData
  //         }
  //       ]
  //     })
  //     // navigation.navigate("MainTab" as never,
  //     // {

  //     // }as never);
  //   } else {
  //     alert('The username/email or password you entered did not match our records')
  //   }
  // }

  return (
    <SafeAreaView style={styles.main_container}>
      {/* <AppHeader includeLogin={false} /> */}

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
            <FontAwesomeIcon icon={faUserCircle} size={28} />
          </View>
          <TextInput
            style={styles.TextInput}
            placeholder="Username or Email."
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={email => setEmail(email)}
          />
        </View>

        <View style={styles.inputView}>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon icon={faLock} size={28} />
          </View>
          <TextInput
            style={styles.TextInput}
            placeholder="Password."
            placeholderTextColor="#003f5c"
            secureTextEntry={hidePassword}
            onChangeText={password => setPassword(password)}
          />
          <TouchableOpacity onPress={() => setPasswordHideFlag(!hidePassword)}>
            <FontAwesomeIcon icon={hidePassword ? faEye : faEyeSlash} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            onLogin();
          }}>
          <Text>Login</Text>
        </TouchableOpacity>

        <View style={styles.btn_container}>
          <TouchableOpacity>
            <Text
              style={[styles.link_btn, styles.signup_button]}
              onPress={() => {
                navigation.navigate('Signup' as never);
              }}>
              Sign up
            </Text>
          </TouchableOpacity>
          <Text>|</Text>
          <TouchableOpacity>
            <Text style={[styles.link_btn, styles.forgot_button]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
