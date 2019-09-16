import React, { Component } from "react";

class Form extends Component {
    state={
        EmployeeID:'',
    }

onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
}

render() {
    return (
            <div>
            <h1 align="center"> Delete Employee Detail</h1>
            <p align="center">Enter the Employee ID to be deleted</p>

            <form align="center">
                Employee ID: 
                <input placeholder='employeeid'
                value={this.state.value}
                onChange={ e=> this.setState({EmployeeID: e.target.value})} />
                <br></br>
                <br></br>
                <input type="submit" onClick={e => this.onSubmit(e)} id="button"></input>
            </form> 
            </div>
    );

}

}

export default Form;