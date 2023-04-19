import { AuthenticationResponse, UserLoginInterFace } from "../Interface/UserInterface"
import UserModel from "../Models/UserModel"
import { validateEmail } from "../Util/HelperUtil"


class UserController {
  #model: UserModel
  constructor() {
    this.#model = new UserModel()
  }

  async login(email: string, password: string) {
   
    if (!email && !password) {
      
      return {
        success : false,
        error : "Please enter username and password to login",
        message : null
      }
    }

    try {
      let firebaseResponse = await this.#model.login(email, password)
      console.log(firebaseResponse)
      return {
        success : true,
        error : null,
        message : "Logged in successfully"
      }
    }catch(err) {
      
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
        success : false,
        error : String(err),
        message : null
      }
    }
    

  }

  signOut() {
    return  this.#model.signOut()
  }

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
          success : false,
          error : String(error),
          message : null
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

  getUser() {
    return this.#model.getUser
  }
}

export default UserController