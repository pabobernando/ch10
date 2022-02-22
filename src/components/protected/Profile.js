import React, { Component } from 'react';
import {ref,firebaseAuth} from '../../config/constants'
import firebase from 'firebase'
import { editUser} from '../../helpers/auth'
// import React,{useState,useEffect} from 'react';

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}


export default class Profile extends Component {

  constructor () {
    super();
    this.updateUsername = this.updateUsername.bind(this);
    this.state = {
      username: "",
      email: "",
    }
    
    this.currentUser = firebaseAuth().currentUser.uid
    
   
  }

  componentDidMount() {
    this.getDataUser();
  }

 

  setDataUser = async (user) =>{
    // let data = await this.getDataUserComplete();
    
    this.setState({
      username: user.username,
      email: user.email,
    });
    
  }

  getDataUser = () =>{
    ref.child(`users/${this.currentUser}/info`)
    .once('value')
      .then(snapshot => {
          this.setDataUser(snapshot.val());
    });
    
  }

  

  updateUsername = (event) => {
    this.setState({
      username: event.target.value 
    });
  }


  updateEmail = (event) => {
    this.setState({
      email: event.target.value 
    });
  }

  handleSubmit = (e) => {

    const {history} = this.props

    e.preventDefault()
    editUser(this.state.username, this.state.email, this.currentUser)
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
    history.push('/dashboard')
  }


  
  

  


  render () {
    return (  
      <div className="col-sm-6 col-sm-offset-3">
      <h1> My Profile </h1>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Username</label>
            <input
              className="form-control"
              type="text"
              id="username"
              value={this.state.username}
              onChange={this.updateUsername}
            />
          </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.updateEmail}
            />
        </div>
        <button type="submit" className="btn btn-primary">Edit Data</button>
    </form>
    </div>

    )
  }
}