import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link ,NavLink} from "react-router-dom";

import ViewStudents from './viewStudents.js';
import ViewCv from './viewCv.js';
import ViewCompanies from './viewCompanies.js';
import ViewJobs from './viewJobs.js';

import * as firebase from 'firebase';



class Admin extends Component {
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
                            <h1>Admin Pannel</h1>
                            <h4><b>Name :</b>  {this.state.user.name}  </h4>
                            <h4><b>Email :</b> {this.state.user.email} </h4>
                            <h4><b>Type :</b> {this.state.user.type} </h4>
                        </div>
                        
                        <button type="button" className="btn btn-success btn-sm">
                        <NavLink to="/ViewStudents" >All Students</NavLink>
                        </button>

                        <button type="button" className="btn btn-success btn-sm">
                        <NavLink to="/ViewCompanies" >All Companies</NavLink>
                        </button>

                        <button type="button" className="btn btn-success btn-sm">
                        <NavLink to="/ViewJobs" >All Jobs</NavLink>
                        </button>
                        
                        <button type="button" className="btn btn-success btn-sm">
                        <NavLink to="/ViewCv" >All Cv's</NavLink>
                        </button>
                    </div>

                    <div className="rightpanel col-sm-7">
                        <Route path="/viewStudents" component={ViewStudents}/>
                        <Route path="/viewCv" component={ViewCv}/>
                        <Route path="/viewCompanies" component={ViewCompanies} />
                        <Route exact path="/viewJobs" component={ViewJobs} />
                     </div>
                </div>
            </Router>
        
      

    )
  }
}


export default Admin ;