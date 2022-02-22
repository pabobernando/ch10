import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { getAll } from '../../helpers/auth'


export default class DetailUser extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentUSer: {
       key: null,
       username: "",
       email : ""
      }
    };
  
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if(prevState.currentUser === undefined){
      return {
        currentUSer: nextProps.user,
      };
    }else{
      if (prevState.currentUser.username !== nextProps.user.username) {
        return {
          currentUSer: nextProps.user,
        };
      }
      
    }
     
  
      return prevState.currentUser;
  }
  

  componentDidMount() {
    this.setState({
      currentUSer : this.props.user,
    });
  }

  

  
  render () {
    return (
      <div className="main-screen-content-table">
        <div className="table">
        
           <h1>Profile Users</h1>
           <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                  <input
                    className="form-control"
                    type="text"
                    id="username"
                    value={this.state.currentUSer.username}
                    readOnly
                  />
                </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    value={this.state.currentUSer.email}
                    readOnly
                  />
              </div>
          </form>
        </div>
      </div>
      
    )
  }
}