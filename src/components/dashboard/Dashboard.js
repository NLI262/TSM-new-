import React from "react";
import Display from "./Display.js";
import Toolbar from "./Toolbar.js";
import Sidedrawer from "./Sidedrawer.js";
import ChartForAllProjects from "./Chartforallprojects.js";
import "./Dashboard.css";

export default class Dashboard extends React.Component {
  state = {
    sideDrawerOpen: true
  };

  drawOpenClickHandler = () => {
    this.setState(prevState => {                                       //function for sidebar
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  render() {
    let sideDrawerOpen;
    if (this.state.sideDrawerOpen) {
      sideDrawerOpen = <Sidedrawer />;
    }

    return (
      <div style={{ width: "100%" }}>
        <Toolbar drawerClickHandler={this.drawOpenClickHandler} />
        <Sidedrawer show={sideDrawerOpen} />
        <main style={{ marginTop: "64px" }}>
          <ChartForAllProjects />

          <Display />
          <br></br>
        </main>
        <div>
          {" "}
          <footer className="footer"> privacy and policy @ 2019</footer>{" "}
        </div>
      </div>
    );
  }
}
