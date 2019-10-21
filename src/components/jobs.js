import React, { Component } from 'react';
import * as firebase from 'firebase';



class Job extends Component {
    constructor() {
        super();
        this.state = {
            jobs: []
            
        }
    }


    job(ev) {
        ev.preventDefault();

        const jobTitle = this.refs.jobTitle.value;
        const salary = this.refs.salary.value;
        const jobDescription = this.refs.jobDescription.value;
        
        if (!jobTitle ||  !salary  || !jobDescription) {
          alert("all fields are required");
        } 
        else {
            var job = {
                jobTitle: this.refs.jobTitle.value,
                salary: this.refs.salary.value,
                jobDescription: this.refs.jobDescription.value,
                uid: firebase.auth().currentUser.uid
            }
            var allJobs = firebase.database().ref();
            const allJobs1 = allJobs.child("jobs").push(
                job
            )
            this.setState({
                jobs: [...this.state.jobs, job]
            })
            alert("Job Posted");
            this.refs.jobTitle.value="";
            this.refs.salary.value="";
            this.refs.jobDescription.value="";
        }
    
    }

    

   
  render () {
    return (
    <div>
        <div className="jobwraper">
        
          <h1>Job Post</h1>
          <input type="text" ref="jobTitle" placeholder="Job Title" /> <br />
          <input type="number" ref="salary" placeholder="Salary" /> <br />
          <input type="text" ref="jobDescription" placeholder="Job Description" /><br />
          <button  onClick={this.job.bind(this)}>POST</button>
        </div>

    </div>  


)
  }
}  
  export default Job ;