import auth from '@react-native-firebase/auth';
import {UserAuthentication} from '../models/user.model';

export function signUpUser(signUpdata: UserAuthentication): Promise<any> {
  return auth().createUserWithEmailAndPassword(
    signUpdata.username,
    signUpdata.password,
  );
}

export function signIn(loginData: UserAuthentication) {
  return auth().signInWithEmailAndPassword(
    loginData.username,
    loginData.password,
  );
}
