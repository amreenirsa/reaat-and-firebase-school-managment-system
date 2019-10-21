import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import * as firebase from 'firebase';

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBD1jHRPBxrRwqh7QD0C_INXZ5WEV6-tcg",
    authDomain: "campusrecruitmentsystem-323cc.firebaseapp.com",
    databaseURL: "https://campusrecruitmentsystem-323cc.firebaseio.com",
    projectId: "campusrecruitmentsystem-323cc",
    storageBucket: "campusrecruitmentsystem-323cc.appspot.com",
    messagingSenderId: "894109094138"
  };
  firebase.initializeApp(config);
  
 

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
