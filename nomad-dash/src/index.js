import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyD9QEbkOyk0B25L3s7X1T_wfBNuLrOyCuc",
  authDomain: "nomad-fire.firebaseapp.com",
  databaseURL: "https://nomad-fire.firebaseio.com",
  projectId: "nomad-fire",
  storageBucket: "nomad-fire.appspot.com",
  messagingSenderId: "1097082057466"
};

firebase.initializeApp(config);

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
),document.getElementById('root'));
registerServiceWorker();
