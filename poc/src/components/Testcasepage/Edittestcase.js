import React from "react";
import { Form, Col } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";



export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id: '',
        testCaseTitle: '',
        testCaseType: '',
        testPriority: '',
        testEstimate: '',
        prerequisites: '',
        steps: '',
        expectedOutput:''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log("props", this.props);
    this.setState(
      {
        id: this.props.data && this.props.data.id ? this.props.data.id : "",
        testCaseTitle :
          this.props.data && this.props.data.testCaseTitle
            ? this.props.data.testCaseTitle
            : "",
        testCaseType:
          this.props.data && this.props.data.testCaseType
            ? this.props.data.testCaseType
            : "",
        testPriority:
          this.props.data && this.props.data.testPriority
            ? this.props.data.testPriority
            : "",
        testEstimate:
          this.props.data && this.props.data.testEstimate
            ? this.props.data.testEstimate
            : "",
        prerequisites:
          this.props.data && this.props.data.prerequisites
            ? this.props.data.prerequisites
            : "",
        steps:
          this.props.data && this.props.data.steps
            ? this.props.data.steps
            : "",
        expectedOutput:
          this.props.data && this.props.data.expectedOutput
            ? this.props.data.expectedOutput
            : "",
        
      },
      console.log("didMount", this.state)
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextprops data", nextProps);
    this.setState(
      {
        id: nextProps.data && nextProps.data.id ? nextProps.data.id : "",
        testCaseTitle:
          nextProps.data && nextProps.data.testCaseTitle
            ? nextProps.data.testCaseTitle
            : "",
        testCaseType:
          nextProps.data && nextProps.data.testCaseType
            ? nextProps.data.testCaseType
            : "",
        testPriority:
          nextProps.data && nextProps.data.testPriority
            ? nextProps.data.testPriority
            : "",
        testEstimate:
          nextProps.data && nextProps.data.testEstimate ? nextProps.data.testEstimate 
          : "",
        prerequisites:
          nextProps.data && nextProps.data.prerequisites ? nextProps.data.prerequisites 
          : "",
        steps:
          nextProps.data && nextProps.data.steps ? nextProps.data.steps 
          : "",
        expectedOutput:
          nextProps.data && nextProps.data.expectedOutput ? nextProps.data.expectedOutput 
          : ""
      },
      console.log("nextProps", this.state)
    );
  }
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

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
              Edit Testcase
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              
            <Form>
              <Form.Row>

                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label class="control-label" for="title">Title</Form.Label>
                  <span class="required">*</span>
                  <Form.Control 
                  required="required"
                  type="text" 
                  placeholder="Enter testcase title"
                   value= {this.state.testCaseTitle}
                   name="testCaseTitle"
                   onChange={ this.handleChange}
                   />
                </Form.Group>
                </Form.Row>

                <Form.Row>
                <Form.Group as={Col} controlId="formGridType">
                  <Form.Label class="control-label" for="type">Type</Form.Label>
                  <span class="required">*</span>
                  <Form.Control as="select" 
                  required="required"
                  value={this.state.testCaseType} 
                  name="testCaseType" 
                  onChange={ this.handleChange}>
                  <option value="Functional">Functional</option>
                      <option value="Non-Functional">Non-Functional</option>
                      <option value="Regression">Regression</option>
                      <option value="Smoke">Smoke</option>
                    </Form.Control>
                    </Form.Group>

                <Form.Group as={Col} controlId="formGridType">
                  <Form.Label class="control-label" for="priority">Priority</Form.Label>
                  <span class="required">*</span>
                  <Form.Control as="select" 
                  required="required"
                  value={this.state.testPriority} 
                  name="testPriority" 
                  onChange={ this.handleChange}>
                  <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEstimate">
                  <Form.Label class="control-label" for="estimate">Estimate</Form.Label>
                  <span class="required">*</span>
                  <Form.Control type="number" 
                   required="required"
                   placeholder="Enter Estimate" min={1} max={8}
                   value= {this.state.testEstimate} 
                   name="testEstimate"
                   onChange={ this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
            
              <Form.Row>
                <Form.Group as={Col} controlId="formGridprerequisite">
                  <Form.Label>Prerequisite</Form.Label>
                  <Form.Control type="text area" as="textarea" rows="3" placeholder="" 
                  value= {this.state.prerequisites} 
                  name="prerequisites"
                  onChange={this.handleChange} />      
                </Form.Group>
                </Form.Row>

                <Form.Row>
                <Form.Group as={Col} controlId="formGridsteps">
                  <Form.Label>Test Procedure</Form.Label>
                  <Form.Control type="text area" as="textarea" rows="3" placeholder=""
                  value= {this.state.steps} 
                  name="steps"
                  onChange={this.handleChange} />
                </Form.Group>
                </Form.Row>

                <Form.Row>
                <Form.Group as={Col} controlId="formGridExpectedOutput">
                  <Form.Label class="control-label" for="output">Expected Output</Form.Label>
                  <span class="required">*</span>
                  <Form.Control type="text area" as="textarea" rows="3" placeholder=""
                  required="required"
                  value= {this.state.expectedOutput} 
                  name="expectedOutput"
                  onChange={this.handleChange} />
                </Form.Group>

              </Form.Row>

              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={async () => await this.props.onSubmit(this.state)}
            >
              {" "}
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}