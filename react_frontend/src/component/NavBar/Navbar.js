import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap';


import * as routes from '../../constants/routes'
import './NavBar.css'





const Nav = ({currentUser}) => 
    <div>
        <h5>NAVBAR</h5>
        <NavLink to={routes.HOME} exact activeClassName='selected' ><Button color="primary">HOME</Button></NavLink> <br/>
        <NavLink to={routes.USERS}  exact activeClassName='selected' ><Button color="primary">USERS</Button></NavLink> <br/>
        <NavLink to={routes.POSTS} exact activeClassName='selected' ><Button color="primary">POSTS</Button></NavLink> <br/>
        <NavLink to={routes.EXERCISE} exact activeClassName='selected'><Button color="primary">EXERCISE</Button></NavLink>  <br/>
        <NavLink to={routes.ROOT} exact activeClassName='selected'><Button color="primary">ROOT</Button></NavLink>  <br/>
        {
      currentUser
        ? <span>hello {currentUser.username}</span>
        :  <NavLink to={'/login'} activeClassName="selected"><Button color="primary">LOGIN</Button> </NavLink>
    }
    </div>

export default Nav