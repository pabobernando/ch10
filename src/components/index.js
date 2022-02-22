import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './protected/Dashboard'
import Profile from './protected/Profile'
import ListUsers from './protected/ListUsers'
import ListGame from './protected/ListGame'
import Game from './protected/Game'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-expand-lg sticky-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">Binar Gaming Area</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  {this.state.authed && <Link to="/dashboard" className="navbar-brand">Dashboard</Link>}
                </li>
                <li>
                  {this.state.authed && <Link to="/my-profile" className="navbar-brand">My Profile</Link>}
                </li>
                <li>
                  {this.state.authed && <Link to="/list-users" className="navbar-brand">List Users</Link>}
                </li>
                <li>
                  {this.state.authed && <Link to="/list-game" className="navbar-brand">List Game</Link>}
                </li>
                <li>
                  {this.state.authed && <button
                      style={{border: 'none', background: 'transparent'}}
                      onClick={() => {
                        logout()
                      }}
                      className="navbar-brand">Log Out</button>}  
                </li>
                <li>
                  {!this.state.authed && <Link to="/login" className="navbar-brand">Login</Link>}  
                </li>
                <li>
                  {!this.state.authed &&<Link to="/register" className="navbar-brand">Register</Link>} 
                </li>
              </ul>
            </div>
          </nav>
          <div id="main" className="main-screen">
            <div className="row">
              <Switch>
                <Route path='/' exact component={Home} />
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                <PrivateRoute authed={this.state.authed} path='/my-profile' component={Profile} />
                <PrivateRoute authed={this.state.authed} path='/list-users' component={ListUsers} />
                <PrivateRoute authed={this.state.authed} path='/list-game' component={ListGame} />
                <PrivateRoute authed={this.state.authed} path='/react-paper-scissors' component={Game} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
