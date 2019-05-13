import React,{ Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';



// Components 
import NavBar from './component/NavBar/Navbar'
import Login from './component/Login/Login'
import ShowUser from './component/ShowUser/ShowUser'
import Exercise from './component/Exercise/Exercise'

import * as routes from './constants/routes'
import './App.css';

class App extends Component {
  state = {
    currentUser: null,
    exercise: []
  }

  doSetCurrentUser = user =>
  this.setState({
    currentUser: user
  })

  componentDidMount(){
    this.getExercise().then(data =>
      this.setState({
        exercise: data.data.results
      })
      )
  }

  getExercise = async() => {
    try {
      const exercise = await fetch('/api/exercise')
      if(!exercise.ok){
        throw Error(exercise.response.statusText)
      }
      const exerciseJson = await exercise.json()
      return exerciseJson
      
    } catch (err) {
      console.log(err, 'err in the catch block')
      return err
    }

  }

  render() {
    console.log(this.state.exercise)
    const{ exercise } = this.state
    return (
      <div>
        <NavBar currentUser={this.state.currentUser}/>
        <Switch>
        <Route exact path="/login" render={()=> <Login currentUser={this.state.currentUser} doSetCurrentUser={this.doSetCurrentUser}/>}/>
        <Route exact path={routes.ROOT} render={() => <div>This is the Root page</div>} />
        <Route exact path={routes.HOME} render={() => <div>This is the Home Page</div>} />
        <Route exact path={routes.USERS}  render={() => <div>This is the users page</div>} />
        <Route exact path={`${routes.USERS}/:id`} render={() => <ShowUser />} />
        <Route exact path={routes.POSTS}  render={() => <div>This is the posts page</div>} />
        <Route exact path={routes.EXERCISE} render={() => <div>This is the Exercise page <br/> <Exercise exercise={exercise} /></div> } />
        <Route render={() => <div>NotFound</div>} />
        </Switch>
      </div>
    );

  }
  
}

export default App;
