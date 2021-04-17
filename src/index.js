import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import {BrowserRouter} from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyAHcZ5ndSGOaONB-HvQyhCiEQ4d9htFp2g",
  authDomain: "huskler.firebaseapp.com",
  projectId: "huskler",
  storageBucket: "huskler.appspot.com",
  messagingSenderId: "38236777921",
  appId: "1:38236777921:web:036efef465faf5d6835340",
  measurementId: "G-MKEZPQY6S6"
};



  firebase.initializeApp(firebaseConfig);
  firebase.analytics();




ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

