import React, { Component } from "react";

class Form extends Component {
state={
	EmployeeID:'',
	Designation:'',
	NewDesignation:'',
} 
	
onSubmit = e => {
	e.preventDefault();
	console.log(this.state);
}
	
render () {
  return (
       <div>    
	  <p><b>Enter details to be updated below:</b></p>
            
		<form>
  	    	Enter your EmployeeID:<br/>
	    	<input placeholder='xxxx'
			value={this.state.value}
			onChange={ e=> this.setState({EmployeeID: e.target.value})} />
			<br/>
	    	
		{/*	Enter your Manager Name:<br/>
	    	<input placeholder='xxxx'
			value={this.state.value}
			onChange={ e=> this.setState({ManagerName: e.target.value})} />
			<br/>
	    	
			Enter your name:<br/>
	    	<input placeholder='xxxx'
			value={this.state.value}
			onChange={ e=> this.setState({Name: e.target.value})} />
			<br/>
	    	
	    	Enter your updated name:<br/>
	    	<input placeholder='xxxx'
			value={this.state.value}
			onChange={ e=> this.setState({NewName: e.target.value})} />
		    <br/> */}
	    	
	    	Enter your designation:<br/>
	    	<input placeholder='xxxx'
			value={this.state.value}
			onChange={ e=> this.setState({Designation: e.target.value})} />
			<br/>
	    	
	   		Enter your updated designation:<br/>
	   		<input placeholder='xxxx'
			value={this.state.value}
			onChange={ e=> this.setState({NewDesignation: e.target.value})} />
			<br/>
	    	
	   		<button type="button" onClick={e => this.onSubmit(e)}>Submit</button>
		</form>
       </div>       
	);
     }
  }
export default Form;


