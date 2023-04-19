import auth from '@react-native-firebase/auth';


class UserModel {
    /**
     *
     */
    constructor() {
    }

    async login ( email: string, password: string) {
       return await auth().signInWithEmailAndPassword(email, password)
    }
      
    async signOut(){
        return await auth().signOut();
    }
      
    async signUp(email : string, password : string) {
        return await auth().createUserWithEmailAndPassword(email, password)
    }
      
    getUser(){
        return auth().currentUser
    }

    


}

export default UserModel 
