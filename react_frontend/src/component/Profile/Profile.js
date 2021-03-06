import React, { Component } from 'react'
import parse from 'html-react-parser'
import ShowUser from '../ShowUser/ShowUser'

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

     deleteItem = i => 
  this.setState({
    exercise: this.state.exercise.filter((exercise, index) =>
    index !== i
    )
  })
    render () {
        return(
            <div>
                <div> This is the profile page</div>
                <div><ShowUser currentUser={this.props.currentUser} /></div>
                {this.state.workouts.map((w, i) => {
                    const videoLink = w.description.split('https')[1] && `https${w.description.split('https')[1].replace('watch?v=', 'embed/').replace('</p>', '')}`
                    console.log(videoLink)
                    return (
                        <div>
                            
                            <h1>{w.name}</h1>
                            <p>{parse(w.description)}</p>
                            {
                                videoLink
                                    && <iframe  width='400px' height='300px' src={ videoLink } />
                            }
                            
                            <button>Delete</button>
                        </div>
                    )
                })}
            </div>

        )
    }
}

export default Profile 