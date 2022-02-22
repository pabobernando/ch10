import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { getAll } from '../../helpers/auth'
import DetailUSer from './DetailUser'


export default class ListUsers extends Component {
  constructor () {
    super();
    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
    }

    this.onDataChange = this.onDataChange.bind(this);
    this.setActiveUsers = this.setActiveUsers.bind(this);
  }
  

  componentDidMount() {
    getAll().on("value", this.onDataChange);
  }

  refreshList() {
    this.setState({
      currentUser: null,
      currentIndex: -1,
    });
  }

  onDataChange(items) {
  
    let users = [];

    items.forEach((item) => {
      let data = item.val().info;
      let key = item.key;
      users.push({
        key     : key,
        uid     : data.uid,
        username: data.username,
        email   : data.email,
      });
    });

    this.setState({
      users: users,
    });
  }

  setActiveUsers(user, index) {
   
    this.setState({
      currentUser: user,
      currentIndex: index,
    });
  }

  render () {
    let number = 1;
    return (
     
      <div className="main-screen-content-table">
        <table className="table table-dark">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
             
            {this.state.users &&
              this.state.users.map((user,index) => (
                <tr key={index}>
                  <td>{number++}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td><button onClick={() => this.setActiveUsers(user, index)} type="button" className="btn btn-success">View Users</button></td>
                </tr>
              ))}
            </tbody>
        </table>
        <div className="table">
          {this.state.currentUser && (
             <DetailUSer
             user={this.state.currentUser}
             refreshList={this.refreshList}
            />
           )}  
        </div>
      </div>
      
    )
  }
}