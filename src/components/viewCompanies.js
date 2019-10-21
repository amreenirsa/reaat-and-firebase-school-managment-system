import React, { Component } from 'react';
import * as firebase from 'firebase';



class ViewCompanies extends Component {
    constructor(props){
    super(props);
            this.state={
                students:[],
                companies:[],
                all:[]
               
            }
    }
        
    componentDidMount(){
        
        firebase.auth().onAuthStateChanged(()=>{
            if(firebase.auth().currentUser){
                firebase.database().ref("user").on("value",snap=>{
                let obj = snap.val();
                let companiesObj = {};
                let studentsObj = {};
                
               
                for(let key in obj){
                    if(obj[key].type === "student"){
                        studentsObj[key] = obj[key]; 
                        
                    }
                    else if(obj[key].type === "company"){
                        companiesObj[key] = obj[key]; 
                    }
        
                }
                let students = [];
                let companies = [];
                
                
                for(let a in companiesObj){
                    companies.push(companiesObj[a]);
                   
                }
                for(let a in studentsObj){
                    students.push(studentsObj[a])
                }
                this.setState({
                    students,
                    companies,
                    
                    
                })
            })
        }})
    }
    
        
render () {
return (
    <div>
        <div className="viewStudents">
            <h1>All Companies</h1> 
                {
                    this.state.companies && this.state.companies.length ?
                    this.state.companies.map((data,index) => {
                        return <div className="viewStudentstbox">
                            {<span>Name: </span>}   {data.name} <br />
                            {<span>Email: </span>}     {data.email}<br />
                            {<span>Type: </span>}    {data.type}
                            
                        </div>
                                    
                    })
                    : false
                   
                    
                }
        </div>
    </div>
          
        )
      }
    }
    
    
    export default ViewCompanies ;