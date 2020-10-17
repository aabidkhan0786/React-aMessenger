import React from 'react'
import ReactDOM from 'react-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import App from "./App.js"
import firebase from "firebase"
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "../src/Redux/Store/Store"


  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB-WIh9WISJXxjuHDcDBt06F0DSeKA1HQM",
    authDomain: "amessenger-87721.firebaseapp.com",
    databaseURL: "https://amessenger-87721.firebaseio.com",
    projectId: "amessenger-87721",
    storageBucket: "amessenger-87721.appspot.com",
    messagingSenderId: "132305837693",
    appId: "1:132305837693:web:6ed138f8265081ced85b14",
    measurementId: "G-J4LMW29S1G"
  };


  firebase.initializeApp(firebaseConfig);

  window.store = store;

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>  
    </Provider>  
        ,document.getElementById("root"));