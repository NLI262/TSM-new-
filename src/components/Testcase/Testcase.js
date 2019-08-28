import React from "react";
import axios from "axios";
import { Form, Col } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

export default class Testcase extends React.Component {
  state = {
    moduleId: 386,
    testCaseTitle: "",
    TitleError: "",
    testCaseType: "",
    typeError: "",
    testPriority: "",
    priorityError: "",
    testEstimate: "",
    estimateError: "",
    prerequisites: "",
    prerequisitesError: "",
    steps: "",
    stepsError: "",
    expectedOutput: "",
    outputError: "",
    focus: false
  };

  constructor(props) {
    super(props);
    this.state = {};

    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.setState({ addModalShow: true });
  }

  _onBlur = () => {
  //console.log(this.textInput.current.value);
    setTimeout(() => {
      if (this.state.focus) {
        this.setState({
          focus: false
        });
      }
      let TitleError = "";
      if (this.textInput.current.value === "") {
        TitleError = "title is required";
      }
      if (TitleError) {
        this.setState({ TitleError });
        return false;
      }
      return true;
    }, 0);
  };
  _onFocus = () => {
  //console.log("ada");
    if (!this.state.focus) {
      this.setState({
        focus: true
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    //console.log(this.state);
    const isValid = this._onBlur();
    if (isValid) {
     //console.log(this.State);
      this.setState({
        moduleId: 386,
        testCaseTitle: "",
        TitleError: "",
        testCaseType: "",
        typeError: "",
        testPriority: "",
        priorityError: "",
        testEstimate: "",
        estimateError: "",
        prerequisites: "",
        prerequisitesError: "",
        steps: "",
        stepsError: "",
        expectedOutput: "",
        outputError: ""
      });
    }
    axios
      .post("/TSM/test/add", this.state)
      .then(response => {
        if (response.status === 200) {
          alert("New testcase saved successfully");
        }
      })
      .catch(error => {
        //console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create a new Testcase
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter testcase title"
                      value={this.state.value}
                      onChange={e =>
                        this.setState({ testcaseTitle: e.target.value })
                      }
                      // errorTest={this.state.titleError}
                      style={{ width: "765px", marginBottom: "3px" }}
                      onFocus={this._onFocus}
                      onBlur={this._onBlur}
                      ref={this.textInput}
                    />

                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.TitleError}
                    </div>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="Type"
                      value={this.state.testCaseType}
                      onChange={e => this.callThis}
                      required={true}
                      onFocus={this._onFocus}
                      onBlur={this._onBlur}
                    >
                      <option value="">Select</option>
                      <option value="Functional">Functional</option>
                      <option value="Non-Functional">Non-Functional</option>
                      <option value="Regression">Regression</option>
                      <option value="Smoke">Smoke</option>
                    </Form.Control>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.typeError}
                    </div>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridType">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control
                      type="select"
                      as="select"
                      value={this.state.testPriority}
                      onChange={e => this.callThis}
                      required={true}
                      onFocus={this._onFocus}
                      onBlur={this._onBlur}>
                      <option value="">Select</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridEstimate">
                    <Form.Label>Estimate</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Estimate"
                      min={1}
                      max={8}
                      value={this.state.testEstimate}
                      onChange={e =>
                        this.setState({ testEstimate: e.target.value })
                      }
                      onFocus={this._onFocus}
                      onBlur={this._onBlur}
                      ref={this.textInput}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.estimateError}
                    </div>
                  </Form.Group>
                </Form.Row>

                <Form.Group as={Col} controlId="formGridprerequisite">
                  <Form.Label>Prerequisite</Form.Label>
                  <Form.Control
                    type="text area"
                    as="textarea"
                    rows="3"
                    placeholder="eg.."
                    value={this.state.prerequisites}
                    onChange={e =>
                      this.setState({ prerequisites: e.target.value })
                    }
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridsteps">
                  <Form.Label>Test Procedure</Form.Label>
                  <Form.Control
                    type="text area"
                    as="textarea"
                    rows="3"
                    placeholder="eg.."
                    value={this.state.steps}
                    onChange={e => this.setState({ steps: e.target.value })}
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridExpectedOutput">
                  <Form.Label>Expected Output</Form.Label>
                  <Form.Control
                    type="text area"
                    as="textarea"
                    rows="3"
                    placeholder="eg.."
                    value={this.state.expectedOutput}
                    onChange={e =>
                      this.setState({ expectedOutput: e.target.value })
                    }
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                  />
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={e => this.onSubmit(e)}>
              {" "}
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}






