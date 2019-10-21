import React, { Component } from 'react';
import * as firebase from 'firebase';



class ViewCv extends Component {
    
    constructor() {
        super();
        this.state = {
            cv: [],
            cvKeys:[]
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
            firebase.database().ref("cv").on("value", snap=>{
                let obj = snap.val();
                let cv = [];
                let cvKeys=[]
                for(let key in obj){
                    cvKeys.push(key)
                    cv.push(
                    obj[key])
                }
            
                this.setState({
                    cv:cv,
                    cvKeys:cvKeys
                })
            })
        })
    }
    deletejob(index){
       var key= this.state.cvKeys[index];
    //    alert();
    //    console.log(keys);
        firebase.database().ref('cv/'+key).remove();
    
    }
      render () {
        return (
            <div>
                <div className="jobpost">
                        <h1>All CV's</h1>
                        {this.state.cv.map((data,index)=>(
                        <div className="jobpostbox" key={index}>
                            {<span>Name: </span>}   {data.name} <br />
                            {<span>Education: </span>}  {data.education}   <br />
                            {<span>Skills: </span>} {data.skils} <br />
                            {<span>Gpa: </span>} {data.gpa} <br />
                            {<span>Overview: </span>} {data.overview} <br />
                            {this.state.checkAdmin?
                            
                            <button onClick={this.deletejob.bind(this,index)}>Delete</button>
                            : '' }
                        </div>
                            ))}
                        
                </div>
            </div>
        )
      }
    }
    
    
    export default ViewCv ;