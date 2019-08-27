import React, { Component } from "react";
import "./Homepage.css";
import axios from "axios";
//import GoogleLogin from "react-google-login";
//import { object } from "prop-types";
import firebase from "firebase";
import { StyledFirebaseAuth } from "react-firebaseui";
//import { object } from "prop-types";

firebase.initializeApp({
  apiKey: "AIzaSyDTq9Mm0X5-QbJO7h188WaW4jefA58xDD0",
  authDomain: "test-suite-management.firebaseapp.com"
})

class HomePage extends Component {

  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],

    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {

      this.setState({ isSignedIn: !!user })
        //console.log(firebase.auth().currentUser);
        if(firebase.auth().currentUser)
        {
        const {displayName,email,photoURL,uid}=firebase.auth().currentUser;
        localStorage.setItem("username", displayName);
        localStorage.setItem("tokenid", uid);
        var JSONobj = {"name":displayName,"email":email,"photoURL":photoURL,"uid":uid};
        console.log({"name":displayName,"email":email,"photoURL":photoURL,"uid":uid});
        }
        axios.post('/TSM/Login/add', JSONobj).then(res=>
          { console.log("Hello");
            console.log(res);
          })
          //console.log("Hello");

      if(user){
        window.location = "/dash"
    }
  
    })


  }


  render () {
  
 //    const responseGoogle = (response) => {
 //    console.log(response.profileObj)
 //   }

return (
<div>

<div class="wrapper">

<article class="main">
<br/>
<img src="https://www.nineleaps.com/wp-content/themes/nineleaps/assets/img/nineleaps-logo.svg" height="60px"></img>
<br></br>
<br></br>

<img src="https://media.glassdoor.com/l/5b/74/79/fe/nineleaps-placed-top-10-out-of-the-top-25-start-ups-in-india-for-2018.jpg" height="270px"></img>

<br></br>
<br></br>


  <StyledFirebaseAuth
  uiConfig={this.uiConfig}
  firebaseAuth={firebase.auth()}/>

    {/*    <GoogleLogin
            clientId="567723174552-jgcp3opo8fdvfq80d4jpfad3mfls7q01.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}/>  */}

            <br/>
            <br/>

<a href="https://www.nineleaps.com/privacy-policy">
<font color="#2980B9">Privacy Policy</font></a>
    &nbsp;&nbsp;© 2019 Nineleaps

</article>

<aside class="aside aside-1">
<br />
<br />
<br />
<br />
<font color="white" size="5">Test Suite Management</font>

</aside>

</div>


</div>
);
}
}

export default HomePage;