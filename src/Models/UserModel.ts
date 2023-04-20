import auth from '@react-native-firebase/auth';
import axios from 'axios';


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

    async updateBio(bio : String) {
        try {
            const res = await axios.post(`https://lively-twill-lion.cyclic.app/users/bio`, {
                email : auth().currentUser?.email,
                bio : bio
                
            });
            console.log(res.data.data);
            return  {
                success : true,
                message: "Updated Success fully"
            }

        } catch (err) {

            console.log(err);
            return {
                success : false,
                message: "Error"
            }
        }
    }


    /**
     * 
     * @returns Get rides for the user
     */
    async getTotalRidesForUser () {
        try {
            const res = await axios.get(`https://lively-twill-lion.cyclic.app/rides/ride_count/${auth().currentUser?.email}`);
            
            const responseData = res.data.data
            
            return  {
                totalRides : responseData?.totalRides,
                requestedRide : responseData?.requestedRide
            }

        } catch (err) {

            console.log(err);
            return {
                totalRides : 0,
                requestedRide : 0
            }
        }
    }



    async getUserFromDb() {
        try {
            const res = await axios.get(`https://lively-twill-lion.cyclic.app/users/${auth().currentUser?.email}`);
            console.log(res.data.data);
            return res.data.data

        } catch (err) {

            console.log(err);
            return auth().currentUser
        }
    }
    async saveUserToDb( fullName: string, email: string, phoneNumber: string ) {
        try {
            const res = await axios.post("https://lively-twill-lion.cyclic.app/users", {
                displayName: fullName,
                email: email,
                phoneNumber: phoneNumber
            });
            console.log(res.data);
            return res.data

        } catch (err) {

            console.log(err);
            return err
        }
    }

    


}

export default UserModel 
