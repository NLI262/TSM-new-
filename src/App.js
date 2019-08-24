import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard.js';
import ProjectPage from './components/ProjectPage/ProjectPage.js';
import SprintPage from './SprintPage';







class App extends Component{

  
 
render()
{

  
  return(
  <div className = "App">
 <BrowserRouter >

<Route  path="/" exact component={Dashboard}/>
<Route   path="/:post_id" component={ProjectPage}/>
 
<Route path ="/:post_id/:all" component ={SprintPage} />


</BrowserRouter>
  

  </div>
  );
}
}


export default App;

