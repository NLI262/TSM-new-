import React, { Component } from "react";
import "./Testcaseexecutionresults.css";


import TSMaxios from "../Axios/TSMaxios";

import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";


class Execute extends Component {
  state = {
    testCaseTitle: "",
    prerequisites: "",
    steps: "",
    expectedOutput: "",
    actualOutput: "",
    status: "",
    executedBy: localStorage.getItem("username"),
    lastUpdate: "",
    attachment: "",
    date:new Date()
  };

  constructor() {
    super()
    this.state={time:new Date()}
  }

  onChange1(e) {
    let files = e.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onLoad = (e) => {
      const formData = { attachment: e.target.result };
      return TSMaxios
        .post("/TSM/testrun/add", formData)
        .then(response => console.log("result", response));
    };
  }

  async componentDidMount() {
    this.setState(
      {
        executedBy: localStorage.getItem("username")
      },
    );
    
    
    await fetch("https://cors-anywhere.herokuapp.com/http://f2c3baf6.ngrok.io/TSM/test/list/87")
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(result => {
        this.setState({
          
          testCaseTitle: result.testCaseTitle,
          testId:result.id,
          prerequisites: result.prerequisites,
          steps: result.steps,
          expectedOutput: result.expectedOutput
        });
      });
  }
  onSubmit = e => {
    e.preventDefault();
    TSMaxios.post({
      url:
        "/TSM/testrun/add",
      timeout: 20000,
      method: "POST",
      responseType: "json",
      data:this.state
    }).then(res => {
      this.props.history.goBack();
    });
  }

  drawOpenClickHandler = () => {
    this.setState(prevState => {                                       //function for sidebar
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  
    render()
    {
      
      return (
        <div>
         
          <br />
          <br />
          <br />
          <div class="wrapper">
            <article class="main">
              <Form>
                <FormGroup row>
                  <Label for="examplesprint" sm={2}>
                    Testcase Title
                  </Label>
                  <Col sm={10}>
                    <Input disabled
                      type="text"
                      id="examplesprint"
                      value={this.state.testCaseTitle}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplerequisites" sm={2}>
                    Pre Requisites
                  </Label>
                  <Col sm={10}>
                    <Input disabled
                      type="textarea"
                      id="examplerequisites"
                      value={this.state.prerequisites}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplesteps" sm={2}>
                    Steps
                  </Label>
                  <Col sm={10}>
                    <Input disabled
                      type="textarea"
                      id="examplesteps"
                      value={this.state.steps}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleoutput" sm={2}>
                    Expected Output
                  </Label>
                  <Col sm={10}>
                    <Input disabled
                      type="textarea"
                      id="exampleoutput"
                      value={this.state.expectedOutput}
                    />
                  </Col>
                </FormGroup>
              </Form>

              <hr />

              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Actual Output
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="email"
                      id="myTextField"
                      placeholder=""
                      value={this.state.value}
                      onChange={e =>
                        this.setState({ actualOutput: e.target.value })
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                <Label for="exampleSelect" sm={2}>
                  Status
                </Label>
                  <Col sm={10}>
                  <Input type="select" name="select" id="exampleSelect"
                    value={this.state.value}
                    onChange={e =>
                      this.setState({ status: e.target.value })}>
                    <option></option>
                    <option value="pass">pass</option>
                    <option value="fail">fail</option>
                  </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Executed By
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="email"
                      id="exampleEmail"
                      placeholder=""
                      value={localStorage.getItem("username")}
                      onChange={e => 
                        this.setState({ executedBy: e.target.value})}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Date Of Execution
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="date"
                      name="doe"
                      id="exampleEmail"
                      placeholder=""
                      value={this.state.value}
                      onChange={e =>
                        this.setState({ lastUpdate: e.target.value + ' ' + this.state.time.toLocaleTimeString()})
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={2}>
                    Attachment
                  </Label> 
                  <Col sm={10}>
                  <input
                    type="file"
                    name="attachment"
                    id="exampleFile"
                    onClick={(e) => this.onChange1(e)}
                  />
                  </Col>
                  <FormText color="muted">
                    Upload your file (image or text file)
                  </FormText>
                </FormGroup>
                <Button color="primary" onClick={e => this.onSubmit(e)}>Save</Button> &nbsp;  
                <Button color="primary" onClick={()=>this.props.history.goBack()}>Cancel</Button>
              </Form>
            </article>
          </div>
        
        </div>
      );
    }
  
}

export default Execute;