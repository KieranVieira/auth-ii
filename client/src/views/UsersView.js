import React, { Component } from 'react'
import axios from 'axios';

export class UsersView extends Component {
    state={
        users:[]
    }

    componentDidMount(){
        const options = {
            headers:{
                authorization: localStorage.getItem('jwt')
            }
        }

        console.log(options)
        axios.get('http://localhost:5000/api/auth/users', options)
            .then(res => {
                this.setState({
                    users: res.data,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            localStorage.getItem('jwt')?
            <div>
                <h1>Users</h1>
                <ul>
                    {this.state.users.map(user => {
                        return <li>{user.username}</li>
                    })}
                </ul>
            </div>:
            <h1>Log in to view users</h1>
        )
    }
}

export default UsersView
