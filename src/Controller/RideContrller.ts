import axios from "axios"
import RideModel from "../Models/RideModel"



class RideController {

    #model = new RideModel()
    
    

    async getPlaceDetail(placeId: string) {
        let postalCode = null
        let address = null

        try {

            
            await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyA04lIksf061PPNP_Z7-jCwxQCKbEwEXTQ`).then (res => {
                
                address = res.data?.result.formatted_address
                res.data?.result.address_components.filter(ele => {

                    
                    if (ele?.types[0] === "postal_code") {
                        postalCode = ele.long_name      
                    }


                })
                
            })
                


            return {
                success : true,
                message : "Api",
                "postalCode" : postalCode,
                "address" : address
            }


        } catch (err) {
            
            console.log(err)

            return {



                success : true,
                message : "Some erro occured",
                "postalCode" : postalCode,
                "address" : address
            }


        }
    }


    async createRide (
        fromAddress : string, 
        toAddress : string, 
        postalCode : string, 
        toPostalCode : string, 
        date : Date, 
        fromPlaceId : string | null, 
        toPlaceId : string | null, 
        postRide : Boolean) {

            if(!fromAddress ||  !toAddress || !postalCode || !toPostalCode || !fromPlaceId || !toPlaceId ) {
                
                return {
                    success : false,
                    message: "Please provide reaquired data",
                }

            }

            let isApostRide = postRide ?? false
            try {
                let response = await this.#model.createRide(fromAddress, toAddress, postalCode, toPostalCode, date, fromPlaceId, toPlaceId, isApostRide)

                return {
                    success : true,
                    message: response.message,
                }    
            } catch (error) {

                return {
                    success : true,
                    message: "Some Error Occured, Please try later",
                }   
                
            }

            

        
    }

    async findRides (
        postalCode : string, 
        toPostalCode : string ,
        date : Date | null
        ) {

            console.log(postalCode, toPostalCode, date)

            if(!postalCode || !toPostalCode  ) {
                
                return {
                    success : false,
                    message: "Please provide reaquired data",
                }

            }

            if(!date) {
                return {
                    success : false,
                    message: "Please select data",
                    rides : []
                }
            }
            

            const response = await this.#model.findRides(postalCode, toPostalCode, date)
            return {
                success : true,
                message: "Please select data",
                rides : response.data
            }


    }
}

export default RideController