import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {validateEmail} from '../../Util/HelperUtil';


import {
  faUserCircle,
  faEnvelope,
  faContactBook,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-regular-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import { UserLoginInterFace } from '../../Interface/UserInterface';
import UserController from '../../Controller/UserController';
import { useTheme } from '../../Context/ThemeContext';

export default function Signup() {
  // loadAsync("Abel_400Regular").then((val) => {
  // useFonts({
  //   Abel_400Regular
  // });
  // })
  
  const [fullName, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [hidePassword, setPasswordHideFlag] = useState<boolean>(true);

  
  const themeContext = useTheme()
  const userController = new UserController() // initialziing user controller 

  const [hideConfirmPassword, setConfirmPasswordHideFlag] =
    useState<boolean>(true);
    

  const navigation = useNavigation();

  const onSignup = async () => {

    const response = await userController.signUp(fullName,email,password,confirmPassword, phone as string)

    if (response.success) {
      Alert.alert(response.message ?? "You are registered successfully!")
      navigation.navigate( 'Login' as never )
    }

    if (!response.success) {
      Alert.alert(response.error ?? "You are registered successfully!")
      
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
              source={require('../../../assets/logo1.png')}
            />
          </View>
          <StatusBar style="auto" />
          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon color={themeContext?.text} icon={faUserCircle} size={28}  />
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder="Name"
              placeholderTextColor={themeContext?.text}
              onChangeText={value => setName(value)}
              autoCapitalize="none"
            />
          </View>
          
          {/* <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon size={28} icon={faUserCircle} />
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              placeholderTextColor="#003f5c"
              onChangeText={value => setUsername(value)}
            />
          </View> */}

          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon icon={faEnvelope} color={themeContext?.text} size={28} />
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor={themeContext?.text}
              onChangeText={value => setEmail(value)}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon icon={faContactBook} color={themeContext?.text} size={28} />
            </View>
            <TextInput
              style={styles.TextInput}
              keyboardType="numeric"
              placeholder="Phone Number"
              placeholderTextColor={themeContext?.text}
              onChangeText={value => setPhone(value)}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon icon={faLock} size={28} color={themeContext?.text} />
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor={themeContext?.text}
              autoCapitalize="none"
              secureTextEntry={hidePassword}
              onChangeText={value => setPassword(value)}
            />
            <TouchableOpacity
              onPress={() => setPasswordHideFlag(!hidePassword)}>
              <FontAwesomeIcon color={themeContext?.text} icon={hidePassword ? faEye : faEyeSlash} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputView}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon icon={faLock} color={themeContext?.text} size={28} />
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor={themeContext?.text}
              secureTextEntry={hideConfirmPassword}
              autoCapitalize="none"
              onChangeText={confirmPassword =>
                setConfirmPassword(confirmPassword)
              }
            />
            <TouchableOpacity
              onPress={() => setConfirmPasswordHideFlag(!hideConfirmPassword)}>
              <FontAwesomeIcon
              color={themeContext?.text}
                icon={hideConfirmPassword ? faEye : faEyeSlash}
              />
            </TouchableOpacity>
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
            <Text>Sign Up</Text>
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




const styles = StyleSheet.create({
  main_container: {
    backgroundColor: '#128892',
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

  TextInput: {
    width: '100%',
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },

  btn_container: {
    flexDirection: 'row',
    marginTop: 12,
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
