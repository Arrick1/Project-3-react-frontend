import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    state={
        username:'',
        password:'',
        logged: false
    }
    changeHandler = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    
      onSubmit = async (e) => {
        e.preventDefault();
        const loginResponse = await fetch('/users/login',{
          method: "POST",
          credentials: 'include',
          body: JSON.stringify(this.state),
          headers: {
            "Content-Type" : 'application/json'
          }
        })

         const parsedResponse = await loginResponse.json();
            if(parsedResponse.success){
              console.log(parsedResponse)
                this.props.doSetCurrentUser(parsedResponse.data)
                this.setState({
                  logged: true
                })
            }
    }

    render() {
      const {username, password} = this.state
      console.log(this.props)
     return (
       this.state.logged
       ? <Redirect to={`/users/${this.props.currentUser._id}`} />
       : <form onSubmit={this.onSubmit}>
            <input type='text' name="username" value={username} onChange={this.changeHandler}/>
            <input type='password' name="password" value={password} onChange={this.changeHandler}/>
            <button type="submit">Login</button>
        </form>
        )
    }
}
export default Login 