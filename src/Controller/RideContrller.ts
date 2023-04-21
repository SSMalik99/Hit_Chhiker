import axios from "axios"



class RideController {

    async getPlaceDetail(placeId: string) {
        let postalCode = null
        let address = null

        try {

            
            await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyA04lIksf061PPNP_Z7-jCwxQCKbEwEXTQ`).then (res => {
                res.data?.result.address_components.filter(ele => {

                    if (ele?.types[0] == "postal_code") {
                        postalCode = ele.long_name      
                    }

                    
                })
                address = res.data?.result.formatted_address
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
}

export default RideController