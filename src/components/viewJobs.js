import React, { Component } from 'react';
import * as firebase from 'firebase';


class  ViewJobs extends Component {

    constructor() {
    super();
        this.state = {
            jobs: [],
            jobKeys:[],
            checkAdmin:false
        }
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(()=>{
            var typeCheck;
            var userId = firebase.auth().currentUser.uid;
            const rootRef= firebase.database().ref();
            const speedRef = rootRef.child('user/'+userId);
            speedRef.on('value',snap => {
             typeCheck=snap.val().type;
                if(typeCheck==='admin'){
                    this.setState({
                        checkAdmin:true
                    })
                }
            })
            firebase.database().ref("jobs").on("value", snap=>{
                let obj = snap.val();
                console.log(obj);
                let jobs = [];
                let jobKeys=[];
                for(let key in obj){
                    jobKeys.push(key)
                    jobs.push(
                    obj[key]
                    )
                }
                this.setState({
                        jobs:jobs,
                        jobKeys:jobKeys
                })                      
            })
           
        })
    }
    
    deletejob(index){
        var key= this.state.jobKeys[index];
        firebase.database().ref('jobs/'+key).remove();
    }
    Applyjob(index){
        var currentUser= firebase.auth().currentUser;
        var currentId= firebase.auth().currentUser.uid;
        firebase.database().ref("cv/"+currentId).on("value",snap=>{
            let obj=(snap.val() || {
             name: currentUser.displayName,
             email: currentUser.email,
            });
        
            var rootRef=firebase.database().ref();
            const speedRef=rootRef.child("jobs/"+this.state.jobKeys[index]+"/apply/"+currentId).set(obj)
        })
        alert('Applied');
    }

    render () {
        return (
            <div>
                <div className="viewJobs">
                    <h1>All Jobs</h1>
                    {this.state.jobs.map((job,index)=>(
                        
                        <div className="viewJobsbox" key={index}>
                            {<span>Job Title: </span>}   {job.jobTitle} <br />
                            {<span>Salary: </span>}  {job.salary}   <br />
                            {<span>Job Description: </span>} {job.jobDescription} <br />
                            {this.state.checkAdmin?
                            <button onClick={this.deletejob.bind(this,index)}>Delete</button>
                            : 
                            <button onClick={this.Applyjob.bind(this,index)}>Apply</button> }
                        </div>
                    ))}
                </div>
            </div>
        )
      }
    }
    
    
    export default  ViewJobs ;