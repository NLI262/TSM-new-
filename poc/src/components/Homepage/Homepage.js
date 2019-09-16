import React, { Component } from "react";
import "./Homepage.css";
import TSMaxios from "../Axios/TSMaxios";
import firebase from "firebase";
import { StyledFirebaseAuth } from "react-firebaseui";

firebase.initializeApp({
  apiKey: "AIzaSyDTq9Mm0X5-QbJO7h188WaW4jefA58xDD0",
  authDomain: "test-suite-management.firebaseapp.com"
});

class HomePage extends Component {
  state = { isSignedIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],

    callbacks: {
      signInSuccessWithAuthResult: () => {
      
      return false;
    }
  }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      if (firebase.auth().currentUser) {
        const {
          displayName,
          email,
          photoURL,
          uid
        } = firebase.auth().currentUser;
        localStorage.setItem("username", displayName);
        localStorage.setItem("tokenid", uid);
        var JSONobj = {
          name: displayName,
          email: email,
          photoURL: photoURL,
          uid: uid
        };
        console.log({
          name: displayName,
          email: email,
          photoURL: photoURL,
          uid: uid
        });
      }
      TSMaxios.post("/TSM/Login/add", JSONobj).then(res => {
        console.log("Hello");
        console.log(res);
      });

      if (user) {
        this.props.history.push('/dashboard');
      }
    });
  };

  render() {
    
    return (
      <div>
        <div class="wrapper">
          <article class="main">
            <br />
            <img
              src="https://www.nineleaps.com/wp-content/themes/nineleaps/assets/img/nineleaps-logo.svg"
              height="60px"
            ></img>
            <br></br>
            <br></br>
            <img
              src="https://media.glassdoor.com/l/5b/74/79/fe/nineleaps-placed-top-10-out-of-the-top-25-start-ups-in-india-for-2018.jpg"
              height="270px"
            ></img>
            <br></br>
            <br></br>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
            <br />
            <br />
            <a href="https://www.nineleaps.com/privacy-policy">
              <font color="#2980B9">Privacy Policy</font>
            </a>
            &nbsp;&nbsp;© 2019 Nineleaps
          </article>

          <aside class="aside aside-1">
            <br />
            <br />
            <br />
            <br />
            <font color="white" size="5">
              Test Suite Management
            </font>
          </aside>
        </div>
      </div>
    );
  }
}

export default HomePage;
