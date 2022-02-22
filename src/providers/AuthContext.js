import React,{Component} from 'react';
import {ref,firebaseAuth} from '../config/constants'

export const AuthProvider = React.createContext;

export const AuthContext = class extends Component{
   state = {
       currentUser : null
   }

   componentDidMount(){
       firebaseAuth().onAuthStateChanged(this.onAuthStateChanged)
   }

   onAuthStateChanged = user =>{
       this.setState({
           currentUser : user
       });
   }


    render(){
        const {children} = this.props
        const contextValue = {
            currentUser: this.state.currentUser
        }

        return(
            <AuthContext.Provider value ={contextValue}>
                {children}
            </AuthContext.Provider >
        )
    }
    
}