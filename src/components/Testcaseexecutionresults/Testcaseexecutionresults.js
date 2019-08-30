import React, { Component } from "react";
import "./Testcaseexecutionresults.css";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import axios from "axios";

class Execute extends Component {
  state = {
    testCaseId: "",
    prerequisites: "",
    steps: "",
    expectedOutput: "",
    actualOutput: "",
    status: "",
    executedBy: "",
    dateOfExecution: "",
    attachment: "",
    testId:"",
    date:new Date()
  };

  onChange1(e) {
    let files = e.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onLoad = e => {
      //console.log("img data ", e.target.result);
      const formData = { attachment: e.target.result };
      return axios
        .post("/TSM/testrun/add", formData)
        .then(response => console.log("result", response));
    };
  }

  async componentDidMount() {
    await fetch("/TSM/test/list/14")
      .then(response => {
        return response.json();
      })
      .then(result => {
       // console.log(result);
        this.setState({
          
          testCaseId: result.id,
          testId:result.id,
          prerequisites: result.prerequisites,
          steps: result.steps,
          expectedOutput: result.expectedOutput
        });
      });
  }
  onSubmit = e => {
    e.preventDefault();
    console.log('sub',this.state);
    axios({
      url:
        "https://cors-anywhere.herokuapp.com/http://550c0cc1.ngrok.io/TSM/testrun/add",
      timeout: 20000,
      method: "POST",
      responseType: "json",
      data:this.state
    }).then(res => {
      console.log('post',res);
    });
  }

    render()
    {
      return (
        <div>
          <div class="wrapper">
            <article class="main">
              <Form>
                <FormGroup row>
                  <Label for="examplesprint" sm={2}>
                    Testcase Id
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      id="examplesprint"
                      value={this.state.testCaseId}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplerequisites" sm={2}>
                    Pre Requisites
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
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
                    <Input
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
                    <Input
                      type="text"
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
                  <Label for="exampleText" sm={2}>
                    Status
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="text"
                      id="myTextField"
                      value={this.state.value}
                      onChange={e => this.setState({ status: e.target.value })}
                    />
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
                      value={this.state.value}
                      onChange={e =>
                        this.setState({ executedBy: e.target.value })
                      }
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
                        this.setState({ dateOfExecution: e.target.value + ' ' + this.state.date.toLocalTimeString()})
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <input
                    type="file"
                    name="attachment"
                    id="exampleFile"
                    onChange1={e => this.onChange1(e)}
                  />
                  <FormText color="muted">
                    Upload your file (image or text file)
                  </FormText>
                </FormGroup>

                <Button onClick={e => this.onSubmit(e)}>Okay</Button>
              </Form>
            </article>

            <aside class="aside aside-1">
              <br />
              <br />
              <br />
              <br />
              <font color="white" size="5">
                Test Suite Management
              </font>
              <br></br>
            </aside>

            <aside class="aside aside-2">
              <br />

              <font color="white" size="5">
                Homepage
              </font>
              <br />
              <br />

              <font color="white" size="5">
                Dashboard
              </font>
              <br />
              <br />

              <font
                color="white"
                size="5"
                href="https://www.nineleaps.com/company/"
              >
                About Us
              </font>
              <br />
              <br />

              <font
                color="white"
                size="5"
                href="https://www.nineleaps.com/contact/"
              >
                Contact Us
              </font>
              <br />
              <br />
            </aside>
          </div>
        </div>
      );
    }
  
}

export default Execute;
