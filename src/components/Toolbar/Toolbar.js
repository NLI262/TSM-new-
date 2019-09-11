import React from "react";
import "./Toolbar.css";
import Togglebutton from "../Togglebutton/Togglebutton";

var firebase = require("firebase");

var x = localStorage.getItem("username");

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div />
      <div>
        {" "}
        <Togglebutton click={props.drawerClickHandler} />
      </div>
      <div className="toolbar__logo">
        <a href="/dashboard">TEST SUITE MANAGEMENT</a>
      </div>
      <div className="spacer" />
      <div className="toolbar_navigation-items">
        <ul>
          <li>
            {x}
          </li>
          <li>
            <a href="">Help</a>
          </li>
          <li>
            <a onClick={() => firebase.auth().signOut() }href="/">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default toolbar;
