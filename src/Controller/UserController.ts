import axios from "axios"
import { AuthenticationResponse, UserLoginInterFace } from "../Interface/UserInterface"
import UserModel from "../Models/UserModel"
import { validateEmail } from "../Util/HelperUtil"


/**
 * User Controller is responsible for every type of functionality from view to controller
 */
class UserController {


  #model: UserModel
  constructor() {
    this.#model = new UserModel()
  }

  // Login user function 
  async login(email: string, password: string) {

    if (!email && !password) {

      return {
        success: false,
        error: "Please enter username and password to login",
        message: null
      }
    }

    try {
      let firebaseResponse = await this.#model.login(email, password)
      console.log(firebaseResponse)
      return {
        success: true,
        error: null,
        message: "Logged in successfully"
      }
    } catch (err) {

      if (String(err).includes('auth/wrong-password')) {

        return {
          success: false,
          error: "That email address is already in use!",
          message: null
        };

      } else if (String(err).includes('auth/invalid-email')) {

        return {
          success: false,
          error: "That email address is invalid!",
          message: null
        };
      }

      return {
        success: false,
        error: String(err),
        message: null
      }
    }


  }

  // Logout function for user
  signOut() {
    return this.#model.signOut()
  }

  // signup Button for users
  async signUp(fullName: string, email: string, password: string, confirmPassword: string, phoneNumber: string): Promise<AuthenticationResponse> {

    if (fullName && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        return {
          success: false,
          error: "Password and ConfirmPassword field should match",
          message: null
        };
      }

      if (!validateEmail(email)) {
        return {
          success: false,
          error: "Please enter a valid email",
          message: null
        };
      }

      // Assign signup data to UserAuthentiocation type variable
      const signupData: UserLoginInterFace = {
        username: email,
        password: password,
      };

      try {

        let firebaseResponse = await this.#model.signUp(email, password)

        // firebaseResponse.user.updatePhoneNumber(phoneNumber)

        firebaseResponse.user.updateProfile({
          displayName: fullName,

        })

        await this.#model.saveUserToDb(fullName, email, phoneNumber)




        return {
          success: true,
          error: null,
          message: "You are registered successfully"
        };


      } catch (error) {

        console.log(String(error))

        if (String(error).includes('auth/email-already-in-use')) {

          return {
            success: false,
            error: "That email address is already in use!",
            message: null
          };
        } else if (String(error).includes('auth/invalid-email')) {

          return {
            success: false,
            error: "That email address is invalid!",
            message: null
          };
        }

        return {
          success: false,
          error: String(error),
          message: null
        }

      }



      return {
        success: false,
        error: "Please enter a valid email",
        message: null
      };
      // .then(res => {

      //   console.log(res.user)
      //   return {
      //     success: false,
      //     error : "That email address is already in use!",
      //     message : null
      //   };

      // }).catch(err => {

      //     

      // })

      // Function to perform signup


    } else {

      return {
        success: false,
        error: "Please fill up all the required fields",
        message: null
      };
    }

  }

  // get current logged in user
  getUser() {

    return this.#model.getUser()
  }

  getUserFromDb() {
    return this.#model.getUserFromDb()
  }


  updateBio(bio: String) {
    return this.#model.updateBio(bio)
  }

  async getTotalRidesForUser() {
    const data = await this.#model.getTotalRidesForUser()

    return data


  }

  async changeMyPassword(password: string, confirmPassword: string) {
    if (password && confirmPassword) {
      
      if (password !== confirmPassword) {
        return {
          success: false,
          error: "Password and ConfirmPassword field should match",
          message: null
        };
      }


      try {

        let firebaseResponse = await this.#model.changePassword(password)

        console.log(firebaseResponse)

        return {
          success: true,
          error: null,
          message: "Password Is Updated Successfully"
        };


      } catch (error) {

        console.log(String(error))

        return {
          success: false,
          error: String(error),
          message: null
        }

      }



      return {
        success: false,
        error: "Please enter a valid email",
        message: null
      };
      // .then(res => {

      //   console.log(res.user)
      //   return {
      //     success: false,
      //     error : "That email address is already in use!",
      //     message : null
      //   };

      // }).catch(err => {

      //     

      // })

      // Function to perform signup


    } else {

      return {
        success: false,
        error: "Please fill up all the required fields",
        message: null
      };
    }
  }
}

export default UserController