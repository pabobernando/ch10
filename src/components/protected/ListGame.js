import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { getAll} from '../../helpers/auth'


export default class ListGame extends Component {

  state = {
    showDetailGame : false,
    users : []

   
  }
  onDataChange = this.onDataChange.bind(this);
 
  gotoGame = () => {
    this.props.history.push("/react-paper-scissors");
  }

  activeDetailGame = () =>{
    this.setState({
      showDetailGame: true,
    });
  }

  componentDidMount() {
    getAll().orderByChild('info/score').limitToLast(3).on("value", this.onDataChange);
  }

  onDataChange(items) {

    
  
    let users = [];

    items.forEach((item) => {
      let data = item.val().info;
      let key = item.key;
      users.push({
        key     : key,
        uid     : data.uid,
        username: data.email,
        email   : data.username,
        score   : data.score
      });
    });

    users = users.sort((a, b) => b.score - a.score);

    this.setState({
      users: users,
    });
  }



  render () {
    let number = 1;
    return (
     
      <div className="main-screen-content-table">
        <table className="table table-dark">
            <thead className="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Game</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Rock Paper Scissors</td>
                    <td><button type="button" onClick={() => this.activeDetailGame()} className="btn btn-success">Detail Game</button> <button onClick={this.gotoGame} type="button" className="btn btn-primary">Play Game</button></td>
                </tr>
            </tbody>
        </table>

        {this.state.showDetailGame && 
        <div>
        <h3>LeaderBoard Game</h3>
        <table className="table table-dark">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Score</th>
                </tr>
            </thead>
            <tbody>
             
            {this.state.users &&
              this.state.users.map((user,index) => (
                <tr key={index}>
                  <td>{number++}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.score}</td>
                </tr>
              ))}
            </tbody>
        </table>
        </div>
        }
      </div>
      
    )
  }
}