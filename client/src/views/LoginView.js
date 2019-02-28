import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export class LoginView extends Component {
  state = {
    username: '',
    password: '',
  }

  handleFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/login', this.state)
      .then(res => {
        localStorage.setItem('jwt', res.data.token);
        this.setState({
            username: '',
            password: '',
        })
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    return (
      <>
        <h1>Login</h1>
        <form onSubmit={this.handleLogin}>
            <input 
              placeholder="Username" 
              name="username" 
              value={this.state.username} 
              onChange={this.handleFormChange}
              type="text"
            />
            <input 
              placeholder="Password" 
              name="password" 
              value={this.state.password} 
              onChange={this.handleFormChange}
              type="password"
            />
            <button type='submit'>Login</button>
        </form>
        <h3>Don't have an account? <Link to="/register">Sign Up</Link></h3>
      </>
    )
  }
}

export default LoginView
