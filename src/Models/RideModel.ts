import axios, { AxiosError } from "axios"
import auth from '@react-native-firebase/auth';
import UserModel from "./UserModel";

class RideModel {
    baseUrl = "https://lively-twill-lion.cyclic.app/rides"



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

            console.log("Create Rides")

            try {
                

            const currentUser = await (new UserModel()).getUserFromDb()

            const apiResponse = await axios.post(`${this.baseUrl}`, {
                 from : fromAddress,
                 to: toAddress,
                 contactEmail : auth().currentUser?.email,
                 contactNumber : currentUser.phoneNumber,
                 fromPostalCode : postalCode,
                 toPostalCode : toPostalCode,
                 destinationPlaceId: toPlaceId,
                 placeId : fromPlaceId,
                 date: date,
                 isDriving: postRide,
                 isCompleted: false
 
             })
             
                return {
                    success : true,
                    message: apiResponse.data.message,

                }

            } catch (error) {
                console.log(error)
                return {
                    success : true,
                    message: "Server error please try later",
                    
                }
            }

    }


    async findRides (postalCode : string, 
        toPostalCode : string, date: Date) {
            console.log("FInd rides")
        try {
            const url = `${this.baseUrl}/`
            console.log(url)
            let apiResponse = await axios.get(url, {
                params:{
                    from : postalCode,
                    to: toPostalCode,
                    date : date
                },
                headers: {
                  Accept: 'application/json',
                  'content-Type': 'application/json',
                },
              },)

            console.log(apiResponse.data)

            return {
                success : true,
                message: "Available data",
                data : apiResponse.data.data
                
            }
            
        } catch (error) {
            
            console.log(error)

                return {
                    success : true,
                    message: "Server error please try later",
                    data : []
                    
                }
        }
    }

}

export default RideModel