import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import * as firebase from 'firebase';


import EditProfile from './editprofile.js'
import ViewCompanies from './viewCompanies.js'
import ViewJobs from './viewJobs.js'


class Student extends Component {
    constructor() {
        super();
            this.state = {
                user: {
                    name: null,
                    email: null,
                    type:null,
                    uid: null
                
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
                          <h4><b>  Name  : </b> {this.state.user.name} </h4>
                          <h4><b>  Email : </b> {this.state.user.email} </h4>
                          <h4><b>  Type  :  </b>{this.state.user.type}</h4>
                        </div>
            
                        <button type="button" className="btn btn-success btn-sm">
                        <NavLink to="/editprofile" >EditProfile</NavLink>
                        </button>

                        <button type="button" className="btn btn-success btn-sm">
                        <NavLink to="/viewCompanies" >ViewCompanies</NavLink>
                        </button>

                        <button type="button" className="btn btn-success btn-sm">
                        <NavLink to="/viewJobs" >ViewJobs</NavLink>
                        </button>
                        
                        
                    </div>

                    <div className="rightpanel col-sm-7">
                      <Route path="/editprofile" component={EditProfile} />
                      <Route path="/viewCompanies" component={ViewCompanies} />
                      <Route exact path="/viewJobs" component={ViewJobs} />
                     </div>
                </div>
            </Router>
        
    )
  }
}


export default Student ;