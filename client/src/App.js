import React, { Component } from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';

import './App.css';
import HomeView from './views/HomeView';
import RegisterView from './views/RegisterView';
import LoginView from './views/LoginView';
import UsersView from './views/UsersView';

class App extends Component {
  render() {
    return (
      <>
        <div>
          <NavLink exact to='/'>Home</NavLink>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/Users'>Users</NavLink>
          {localStorage.getItem('jwt') && 
          <button onClick={() => {
            localStorage.removeItem('jwt')
          }}>Logout</button>}
        </div>
        <main>
          <Route exact path="/" component={HomeView}/>
          <Route path="/register" component={RegisterView}/>
          <Route path="/login" component={LoginView}/>
          <Route path="/users" component={UsersView}/>
        </main>
      </>
    );
  }
}

export default withRouter(App);
