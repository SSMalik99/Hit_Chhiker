import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext, useTheme } from '../../Context/ThemeContext';
import { UserLoginInterFace } from '../../Interface/UserInterface';
import UserController from '../../Controller/UserController';



export interface userData {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
}

export default function ChangePassword() {



    
    const [password, setPassword] = useState('');
    const [hidePassword, setPasswordHideFlag] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [hideConfirmPassword, setConfirmPasswordHideFlag] =
        useState<boolean>(true);

    const navigation = useNavigation();

    const themeContext = useTheme()
    const userController = new UserController()


    const changeMyPassword = async () => {

        const res = await userController.changeMyPassword(password, confirmPassword)
        
        if (res.error) {
            Alert.alert("Error", res.error)
            return
        }

        Alert.alert("Success", res.message ?? "Password Updated")
        goBack()
        
        
    }

    const goBack = () => {
        navigation.navigate("Setting & Privacy")
    }

    return (
        <SafeAreaView style={styles.main_container}>
            {/* <AppHeader includeLogin={false} /> */}

            <View style={styles.container}>

                <StatusBar style="auto" />


                <View style={styles.inputView}>
                    <View style={styles.iconContainer}>
                        <FontAwesomeIcon icon={faLock} color={themeContext?.text} size={28} />
                    </View>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password."
                        placeholderTextColor={themeContext?.text}
                        secureTextEntry={hidePassword}
                        onChangeText={password => setPassword(password)}
                    />
                    <TouchableOpacity onPress={() => setPasswordHideFlag(!hidePassword)}>
                        <FontAwesomeIcon icon={hidePassword ? faEye : faEyeSlash} color={themeContext?.text} />
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
                    style={styles.loginBtn}
                    onPress={() => changeMyPassword()}>
                    <Text>Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => goBack()}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


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
        marginBottom:10
    },
    loginBtnText: {
        // fontFamily:"Abel_400Regular"
    },
});