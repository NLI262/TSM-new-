import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.js";
import ProjectPage from "./components/Projectpage/Projectpage.js";
import SprintPage from "./components/Sprintpage/Sprintpage"
import TestSummary from "./components/Testcasepage/Testsummary"
import Execute from "./components/Testexecutionandresults/Testcaseexecutionresults";
 import HomePage from "./components/Homepage/Homepage";
 import Footer from "./components/Footer/Footer";
 import Toolbar from "./components/Toolbar/Toolbar"


class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar/>
        <BrowserRouter>
           <Route path="/" exact component={HomePage}/> 
          <Route path="/dashboard"  component={Dashboard} />
          <Route  path="/project/:post_id" component={ProjectPage} /> 
          <Route path="/sprint/:post_id/:sprintid"  component={SprintPage} />
           <Route  path ="/testcase/:testid"  component ={TestSummary}/> 
           <Route  path ="/testexecution/:testid" component ={Execute}/>
        </BrowserRouter>
        <Footer/>
      </div>
    );
  }
}

export default App;
