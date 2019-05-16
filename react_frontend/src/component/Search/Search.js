import React, {Component} from 'react'

class SearchMuscle extends Component{
    state = {
        mus: 'spider-man',
        search:''
        
    }
    handleChange = (e) => {
        this.setState({[e.currentTarget.name]:e.currentTarget.value})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.getCharacter(this.state.mus)
        //console.log(char)
    }
    render(){
        const {mus} = this.state
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <input type = 'text' name = 'mus' value = {mus} onChange = {this.handleChange}/>
                    <button type = "submit">Submit</button>
                </form>
            </div>
        )
    }

}

export default SearchMuscle