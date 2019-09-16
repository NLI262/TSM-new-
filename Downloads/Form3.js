import React from "react";

export default class Form extends React.Component {
  state = {
    employeename : "",
    desigination :  "",
    managerid : "",
    employeeid : "",
    password: "",
    
  };
  componentDidMount(){
    return fetch('192.168.1.215:8082/Country/add')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    this.setState({
      employeename : "",
    desigination :  "",
    managerid : "",
    employeeid : "",
    password: "",
    
    });
    this.props.onChange({
      employeename : "",
    desigination :  "",
    managerid : "",
    employeeid : "",
    password: "",
    
    });
  };

  render() {
    return (
      <form autocomplete="on" method="get">
        <input
          name="employeeName"
          placeholder="employeename"
          value={this.state.employeeName}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="desigination"
          placeholder="desigination"
          value={this.state.desigination}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="managerid"
          placeholder="managerid"
          value={this.state.managerid}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="employeeid"
          placeholder="employeeid"
          value={this.state.employeeid}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={e => this.change(e)}
        />
        <br />
        <button onClick={e => this.onSubmit(e)}>Submit</button>
        <button onClick={e => this.onSubmit(e)}>cancel</button>
      </form>
    );
  }
}