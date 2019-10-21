import React, { Component } from 'react';

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";



import ViewStudents from './viewStudents.js';
import ViewCv from './viewCv.js';
import Jobs from './jobs.js';
import Postedjob from './postedjob.js';


import * as firebase from 'firebase';

class Company extends Component {
constructor() {
super();
    this.state = {
        user: {
            name: null,
            email: null,
            type:null,
            uid: null,
            checkAdmin:false
        
        }
   }   
}
    componentDidMount() {
        firebase.auth().onAuthStateChanged(()=>{
            if(firebase.auth().currentUser){
                var Rootref=firebase.database().ref().child("user/"+firebase.auth().currentUser.uid);
                Rootref.on("value",snap=>{
                    let currentUserObj = snap.val()
                    this.setState({
                        user: currentUserObj
                    })
                })
            }
            
        })
              
    }
 
  render () {
    return (
  <Router>
    <div>
      <div className="leftpanel col-sm-4">

        <div className="img"></div>
                        <div className="userInfo">
                          <h1>User Information</h1>
                          <h4>  <b> Name : </b> {this.state.user.name} </h4>
                          <h4>  <b>Email : </b> {this.state.user.email} </h4>
                          <h4>  <b>Type : </b> {this.state.user.type}</h4>
                          
                        </div>
                
                        <button type="button" >
                        <NavLink to="/jobs" >Post Job</NavLink>
                        </button>

                        <button type="button" >
                        <NavLink to="/postedjob" >your posted job</NavLink>
                        </button>

                        <button type="button" >
                        <NavLink to="/viewStudents" >View Students</NavLink>
                        </button>

                        <button type="button" >
                        <NavLink to="/viewCv" >View Students Cv</NavLink>
                        </button>

                        

                        

                        

                        
                        
                        
        </div>

                    <div className="rightpanel col-sm-7">
                      <Route path="/jobs" component={Jobs} />
                      <Route path="/viewStudents" component={ViewStudents} />
                      <Route path="/viewCv" component={ViewCv} />
                      <Route path="/postedjob" component={Postedjob} />
                      
                    </div>
  </div>
</Router>
 
    )
  }
}


export default Company ;