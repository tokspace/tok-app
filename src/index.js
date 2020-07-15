import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDrIOmVTR7_oMcStFsJ3jPMXrEpEByfBzw",
    authDomain: "tokspace-d0b2c.firebaseapp.com",
    databaseURL: "https://tokspace-d0b2c.firebaseio.com",
    projectId: "tokspace-d0b2c",
    storageBucket: "tokspace-d0b2c.appspot.com",
    messagingSenderId: "73848992576",
    appId: "1:73848992576:web:5fca7e043b61a19da180a5",
    measurementId: "G-7LX4F4QDR4",
};

firebase.initializeApp(firebaseConfig);

function writeData() {
    firebase
        .database()
        .ref("User")
        .set({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
        });
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default writeData;
