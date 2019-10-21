import React, { Component } from 'react';
import * as firebase from 'firebase';



class EditProfile extends Component {

  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(() => {
      var currentUser = firebase.auth().currentUser;
      if(currentUser){
        var userId = currentUser.uid;
        const rootRef = firebase.database().ref();
        const speedRef = rootRef.child('cv/'+userId);
        speedRef.on('value', snap => {
          var userObj = snap.val();
          this.setState({ user: userObj 
          });
          if(userObj&&this.refs.name){
              this.refs.name.value = userObj.name;
              this.refs.education.value = userObj.education;
              this.refs.gpa.value = userObj.gpa;
              this.refs.skills.value = userObj.skills;
              this.refs.overview.value = userObj.overview;
          } 
        })
      }
    })
  }

  edit() {
    const name = this.refs.name.value;
    const education = this.refs.education.value;
    const gpa = this.refs.gpa.value;
    const skills = this.refs.skills.value;
    const overview = this.refs.overview.value;
    if (!name || !education || !gpa || !skills || !overview) {
      alert("all fields are required");
    } 
    else {
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('cv/'+userId).set({
  
        name: name,
        education: education,
        gpa: gpa,
        skills: skills,
        overview: overview

      });
      alert("Data has been updated success")
      this.props.history.push('/Student');
    }

  }

 
  
  render () {
    return (
      <div>
        <div className="editprofile">

          <h1>Job Post</h1>
          <input type="text" ref="name" placeholder="Full Name" /><br />
          <input type="text" ref="education" placeholder="Education" /><br />
          <input type="text" ref="gpa" placeholder="GPA" /><br />
          <input type="text" ref="skills" placeholder="Skills" /><br />
          <input type="text" ref="overview" placeholder="Overview" /><br /><br />
          
          <button onClick={this.edit.bind(this)} >update</button>


        </div>
      </div>
    )
  }
}


export default EditProfile ;