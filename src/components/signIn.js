import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';









class SignIn extends Component {

    state = { 
        signMessage: null ,
        error :{
                message : ''
               }
    } 
    
    signIn(){
        var userEmail = this.refs.email.value;
        var userPass = this.refs.pass.value;
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(userEmail,userPass)
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
    }
   
    

       

    render() {
        return (
<div>
    <div className="container">
        <div className="row">
        <div className="col-lg-7"></div>
            <div className="col-md-5">
                <div className="panel with-nav-tabs panel-info">
                    
                    <div className="panel-body">
                        <div className="tab-content">
                            <div id="login" className="tab-pane fade in active register">
                                <div className="container-fluid">
                                    <div className="row">
                                        <h2 className="text-center" > <b> Login  </b></h2><hr />
                                        <form onSubmit={(ev)=>{ev.preventDefault();(this.signIn.bind(this))()}}>

                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-addon">
                                                            <span className="glyphicon glyphicon-user"></span>
                                                        </div>
                                                        <input type="email" placeholder="User Name" name="email"
                                                        className="form-control"
                                                        ref='email' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-12">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-addon">
                                                        
                                                        <span className="glyphicon glyphicon-lock"></span>
                                                        </div>

                                                        <input type="password" placeholder="Password" name="pass"
                                                        className="form-control"
                                                        ref='pass'/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-12">
                                                <button type="submit"  className="btn btn-success btn-block btn-lg">
                                                    Signin
                                                </button>
                                                
                                            </div>
                                        </div>
                                        <div>
                                            <p>
                                            {this.state.error.message}
                                            </p>
                                        </div>

                                        <div>
                                            <Link to ={'./SignUp'}>
                                            <p>Sign up </p>
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


export default SignIn;