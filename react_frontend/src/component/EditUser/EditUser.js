import React, { Component } from 'react'

class EditUser extends Component {
    state = {
    }
    
    render(){
        return (
            <form onSubmit={this.handleChange}>
                <input type="password" name="password" onChange={this.handleChange}/>
                <button type="submit"> Update</button>
            </form>

        )
    }
} 

export default EditUser