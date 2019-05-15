import React, { Component } from 'react'

class Profile extends Component {
    state ={
        workouts: []
    }
    componentDidMount () {
        this.getWorkouts()
        console.log(this.state.workouts)

    }
    getWorkouts =  async () => {
        const workouts = await fetch('/users/profile')
        const parsedWorkouts = await workouts.json()
        console.log(parsedWorkouts)
        this.setState({
            workouts: parsedWorkouts.workouts
        })

    }
    render () {
        return(
            <div> This is the profile page</div>
        )
    }
}

export default Profile 