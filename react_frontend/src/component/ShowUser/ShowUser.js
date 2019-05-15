import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class ShowUser extends Component {
    state = {
        user: {}
      }

    componentDidMount(){
        this.doGetUser()
        .then(({user})=> this.setState({user: user}))

    }
    doGetUser = async () => {
        try {
            const user = await fetch(`/users/${this.props.match.params.id}`)
            const parsedUser = await user.json()
            return parsedUser
        } catch (err) {
            console.log(err)
        }
    }
    render (){
        console.log(this.state)
        return(
            <div>
                <h1> HEllo {this.state.user.username}</h1>
             </div>
        )
    }
}

export default withRouter(ShowUser)