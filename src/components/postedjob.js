import React, { Component } from 'react';
import * as firebase from 'firebase';



class Postedjob extends Component {
    constructor() {
        super();
        this.state = {
            jobs: [],
            keys: [],
            jobKeys:[],
            applier: []
           
            
        }
    }


   
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                firebase.database().ref('jobs').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).on('value', snap => {
                    var obj = snap.val();
                    let keys = [];
                    let jobs = [];
                    let jobKeys=[];
                    for (let key in obj) {
                        keys.push(key);
                        jobs.push(obj[key]);
                        jobKeys.push(key)
                    }
                    
                    this.setState({ jobs, keys , jobKeys })
                    // console.log(this.state.jobs);
                })
                
            }
        
        })
    }

    deletejob(index){
        var key= this.state.jobKeys[index];
        firebase.database().ref('jobs/'+key).remove();
    }

   
  render () {
    return (
      <div>
        <div className="jobpost">
        
            <h1>Your Posted Jobs</h1>
            {this.state.jobs.map((job, index) => (
                <div className="jobpostbox" key={index}>
                    {<span>Job Title: </span>}   {job.jobTitle} <br />
                    {<span>Salary: </span>}  {job.salary}   <br />
                    {<span>Job Description: </span>} {job.jobDescription} <br />
                    <span>Applier :</span>{
                        <Applicants index={index} keys={this.state.keys} />
                    }
                    {<button onClick={this.deletejob.bind(this,index)}>Delete</button>}
                </div>
            ))}
        
</div>
</div>


)
}
}
class Applicants extends React.Component {
    constructor() {
        super();
        this.state = {
            applier: []
        }
    }
    componentDidMount() {
       var root= firebase.database().ref('jobs/' + this.props.keys[this.props.index])
       if(root.child('apply')){
       root.child('apply').on('value', snap => {
            var obj = snap.val();
            let applier=[];
            for(let key in obj){
                applier.push(obj[key])
            }
            this.setState({
                applier:applier
            })
           
        })
    }
  }
    render() {
        return (
            <div>
            {this.state.applier.length?
            <div>
            {this.state.applier.map((data,index)=>(
                <ul index={index}>
                <li>{data.name}</li>
                </ul>
            ))}
            </div>
            : <ul><li>No Applicants</li></ul>}
            </div>
        )
    }
  }
  
  
  export default  Postedjob ;