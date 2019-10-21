import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';


  

class SignUp extends Component {
    constructor(){
        super();
        this.state={
            userType: null,
            error :{
                    message : ''
                   }
        }
    }
    
    
    setUser(event) {
        this.setState({
            userType: event.target.value
        })
    console.log(event.target.value);
    }

    signUp(){
        var userEmail = this.refs.email.value;
        var userPass = this.refs.pass.value;
        var name = this.refs.name.value;
       

        if (!userEmail || !userPass || !name ) {
            alert("all fields are required");
          } 
        else {

            const auth=firebase.auth();
            auth.createUserWithEmailAndPassword(userEmail,userPass).catch(error => {
                this.setState({error})
            })
            .then(data=>{
                firebase.auth().currentUser.updateProfile({
                    displayName:this.refs.name.value,
                })
                var rootRef=firebase.database().ref();
                const speedRef=rootRef.child('user/'+firebase.auth().currentUser.uid).set({
                    email: userEmail,
                    password: userPass,
                    name: this.refs.name.value,
                    type:this.state.userType
                })
                .then((data)=>{
                    
                    var typeCheck;
                    var userId = firebase.auth().currentUser.uid;
                    const rootRef= firebase.database().ref();
                    const speedRef = rootRef.child('user/'+userId);
                    speedRef.on('value',snap => {
                        typeCheck=snap.val().type;
                        if(typeCheck==='admin'){
                            this.props.history.push('/admin');
                        }
                        if(typeCheck==='student'){
                            this.props.history.push('/student');
                        }
                        if(typeCheck==='company'){
                            this.props.history.push('/company');
                        }
                    
                    })
                })
                .catch(error => {
                    this.setState({error})
                })
            
                this.refs.name.value="";
                this.refs.email.value="";
                this.refs.pass.value="";
            })
        }
    }
        

render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                    <div className="col-lg-7"></div>
                        <div className="col-lg-5">
                            <div className="panel with-nav-tabs panel-info">
                                
                                <div className="panel-body">
                                    <div className="tab-content">
                                        <div id="login" className="tab-pane fade in active register">
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <h2 className="text-center" > <b> SignUp  </b></h2><hr />  

                                                <form onSubmit={ev=>ev.preventDefault()}>
                                                    <div className="row">
                                                        <div className="col-xs-12 col-sm-12 col-md-12">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon iga1">
                                                                        <span className="glyphicon glyphicon-user"></span>
                                                                    </div>

                                                                    <input type="text" className="form-control"
                                                                    placeholder="Enter User Name" name="name"
                                                                    ref='name'
                                                                     />



                                                                </div>
                                                            </div> 
                                                        </div>
                                                    </div>
                                                

                                                    <div className="row">
                                                        <div className="col-xs-12 col-sm-12 col-md-12">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon iga1">
                                                                        <span className="glyphicon glyphicon-envelope"></span>
                                                                    </div>

                                                                    <input type="email" className="form-control"
                                                                    placeholder="Enter E-Mail" name="mail"
                                                                    ref='email'
                                                                      />


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-xs-12 col-sm-12 col-md-12">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon iga1">
                                                                        <span className="glyphicon glyphicon-lock"></span>
                                                                    </div>
                                                                        <input type="password" className="form-control" 
                                                                        placeholder="Enter Password" name="pass" 
                                                                        ref= 'pass' 
                                                                        />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    

                                                    <div className="row">
                                                        <div className="col-xs-12 col-sm-12 col-md-12">
                                                            <div className="form-group" onChange={this.setUser.bind(this)}>  
                                                                    
                                                                <input type="radio" 
                                                                
                                                                className="radio-inline"
                                                                
                                                                value="student" name="user" 
                                                                

                                                                 />  Student
                                                                        
                                                                        
                                                                <input type="radio" 
                                                                className="radio-inline"
                                                                value="company" name="user"
                                                                
                                                               
                                                                /> Compnay

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xs-12 col-sm-12 col-md-12">
                                                            <div className="form-group">
                                                                                    
                                                                <button type="submit" 
                                                                onClick={this.signUp.bind(this)}
                                                                className="btn btn-lg btn-block btn-warning"> SignIn
                            
                                                                </button> 

                                                                
                                                            </div>   
                                                        </div>
                                                    </div>
                                                    
           
                                                    <div>

                                                    <p>
                                                    {this.state.error.message} 
                                                    </p>
                                                    
                                                    </div>
                                                    
                                                    <div>
                                                        <Link to ={'/signIn'}>
                                                            <p>Already a user ? Sign in instead</p> 
                                                        </Link>
                                                    </div>
        

                                                    
                                                    
                                                          
                                                    </form>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                                    
                        </div>
                    </div>
                </div>

            </div>
        )
    
    
    
    }



}


export default SignUp;