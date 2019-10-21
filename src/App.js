import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { 
  BrowserRouter as Router,
  Route,
  Link ,
  NavLink
} from 'react-router-dom';



import Button from './components/button.js';
import SignUp from './components/signUp.js';
import SignIn from './components/signIn.js';
import  Admin from './components/admin.js';
import Company from './components/company.js';
import Student from './components/student.js';









class App extends Component {
  
  render() {
    return (
<Router>
  <div>
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <NavLink to="/" className="navbar-brand"> Campus Recruitment System</NavLink>
        </div>
        <Route  path="/" component={Button}/>
      </div>
    </nav>
      <Route exact path="/"/>
      <Route path="/signUp" component={SignUp} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/admin" component={Admin}/>
      <Route path="/student" component={Student}/>
      <Route path="/company" component={Company}/>
  </div>
  
</Router> 



    );
  }
}

export default App;
