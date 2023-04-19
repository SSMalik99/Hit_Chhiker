import { Props } from '@fortawesome/react-native-fontawesome'
import React, {ProviderProps, ReactNode, useContext, useEffect, useState} from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import UserController from '../Controller/UserController';



type AuthContextProviderProps = {
  children : ReactNode,
  value :FirebaseAuthTypes.User | null
}



type AuthContextValues = {
  currentUser : FirebaseAuthTypes.User | null,
  // getUser : any ,
  // login : any,
  // signOut : any,
  // signUp : any

}

const AuthContext = React.createContext<FirebaseAuthTypes.User | null>(null)

export const AuthProvider = ({children, value } : AuthContextProviderProps) => {

  // get controller instance
  const userController = new UserController()

  
  

  // const value = {
  //   currentUser : currentUser,
  //   // getUser : userController.getUser ,
  //   // login : userController.login,
  //   // signOut : userController.signOut,
  //   // signUp : userController.signUp
  // } 

  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

}


export const useAuthUser = () =>{
  return useContext(AuthContext)
}