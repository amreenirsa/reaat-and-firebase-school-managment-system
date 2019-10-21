import React, { Component } from 'react';
import {  BrowserRouter as Router,
        NavLink} from 'react-router-dom';
        
        
import * as firebase from 'firebase';


class Button extends Component {
  constructor() {
    super();
    this.state = {
    user:{
        name: null,
        email: null,
        uid: null
      }
    }
  }

componentWillMount(){
  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
      this.setState({
          user:{
          name : user.displayName,
          email : user.email,
          photoUrl : user.photoURL,
          emailVerified : user.emailVerified,
          uid : user.uid
      }})
    }
    else{
      this.setState({
        user:{
          name : null,
          email : null,
          uid : null 
        }
      })
    }
  })
}

render() {
            return (   
    

<div>
      {!this.state.user.email?
      <ul className="nav navbar-nav navbar-right">
        <li><NavLink to="/signUp"><span className="glyphicon glyphicon-user"></span> Sign Up</NavLink></li>
        <li><NavLink to="/signIn"><span className="glyphicon glyphicon-log-in"></span> Sign In</NavLink></li>
      </ul>:
      <ul className="nav navbar-nav navbar-right">
        <li><NavLink to="/" onClick={()=>{firebase.auth().signOut()}}>
        <span className="glyphicon glyphicon-log-out"></span> Signout</NavLink></li>   
      </ul> }
</div> 
    
    
    
)
                     
}}



export default Button;
