import axios from "axios"
import auth from '@react-native-firebase/auth';
import UserModel from "./UserModel";

class RideModel {
    baseUrl = "http://localhost:3000/rides"

    async createRide(
            fromAddress : string, 
            toAddress : string, 
            postalCode : string, 
            toPostalCode : string, 
            date : Date, 
            fromPlaceId : string | null, 
            toPlaceId : string | null, 
            postRide : Boolean
        ) {
            console.log("HJere")

            axios.post(`${this.baseUrl}/`, {
                from : fromAddress,
                to: toAddress,
                contactEmail : auth().currentUser?.email,
                contactNumber : (await (new UserModel()).getUserFromDb()).phoneNumber,
                fromPostalCode : postalCode,
                toPostalCode : toPostalCode,
                destinationPlaceId: toPlaceId,
                placeId : fromPlaceId,
                date: date,
                isDriving: postRide,
                isCompleted: false

            }).then(res => {
                

                console.log(res.data)

            }).catch(err => {
                console.log(err)
            })
    }

}

export default RideModel