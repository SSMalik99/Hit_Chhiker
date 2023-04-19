import auth from '@react-native-firebase/auth';
import {  UserLoginInterFace } from '../Interface/UserInterface';


export function signUpUser(signUpdata: UserLoginInterFace): Promise<any> {
  return auth().createUserWithEmailAndPassword(
    signUpdata.username,
    signUpdata.password,
  );
}

export function signIn(loginData: UserLoginInterFace) {
  return auth().signInWithEmailAndPassword(
    loginData.username,
    loginData.password,
  );
}
