import React from "react";
import TSMaxios from "../Axios/TSMaxios";
import { Form, Col } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";


export default class TestCaseCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      testCaseTitle: "",
      testCaseType: "",
      testPriority: "",
      testEstimate: "",
      prerequisites: "",
      steps: "",
      expectedOutput: "",
     
    }
    

  };
  
 
       


  componentDidMount() {
    this.setState({ addModalShow: true });
  }

  onSubmit = e => {
    e.preventDefault();
    TSMaxios
      .post(`/TSM/test/${this.props.create.id}/add`, this.state)
      .then(response => {
        if (response.status === 200) {
          this.props.onTestCaseCreate(response.data);
        }
      })
      .catch(error => {
        console.log(error);

      });
  };

  
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Testcase
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form onSubmit={this.onSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label class="control-label" for="title">Title</Form.Label>
                  <span class="required">*</span>
                  <Form.Control
                  required="required"
                    type="text"
                    placeholder="Enter testcase title"
                    value={this.state.value}
                    
                    onChange={e =>
                      this.setState({ testCaseTitle: e.target.value })
                    }
                  />

                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridType">
                  <Form.Label class="control-label" for="type">Type</Form.Label>
                  <span class="required">*</span>
                  <Form.Control
                  required="required"
                    as="select"
                    value={this.state.value}
                    onChange={e =>
                      this.setState({ testCaseType: e.target.value })
                    }
                  >
                    <option value="Functional">Functional</option>
                    <option value="Non-Functional">Non-Functional</option>
                    <option value="Regression">Regression</option>
                    <option value="Smoke">Smoke</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridType">
                  <Form.Label class="control-label" for="priority">Priority</Form.Label>
                  <span class="required">*</span>
                  <Form.Control
                  required="required"
                    as="select"
                    value={this.state.value}
                    onChange={e =>
                      this.setState({ testPriority: e.target.value })
                    }
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEstimate">
                  <Form.Label class="control-label" for="estimate">Estimate</Form.Label>
                  <span class="required">*</span>
                  <Form.Control
                  required="required"
                    type="number"
                    placeholder="Enter Estimate"
                    min={1}
                    max={8}
                    value={this.state.value}
                    onChange={e =>
                      this.setState({ testEstimate: e.target.value })
                    }
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridprerequisite">
                  <Form.Label class="control-label" for="prequisite">Prerequisite</Form.Label>
                  <span class="required">*</span>
                  <Form.Control
                  required="required"
                    type="text area"
                    as="textarea"
                    rows="3"
                    placeholder="Enter prerequisite"
                    value={this.state.value}
                    onChange={e =>
                      this.setState({ prerequisites: e.target.value })
                    }
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridsteps">
                  <Form.Label class="control-label" for="steps">Steps</Form.Label>
                  <span class="required">*</span>
                  <Form.Control
                  required="required"
                    type="text area"
                    as="textarea"
                    rows="3"
                    placeholder="Enter steps"
                    value={this.state.value}
                    onChange={e => this.setState({ steps: e.target.value })}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridExpectedOutput">
                  <Form.Label class="control-label" for="output">Expected Output</Form.Label>
                  <span class="required">*</span>
                  <Form.Control
                  required="required"
                    type="text area"
                    as="textarea"
                    rows="3"
                    placeholder="Enter output"
                    value={this.state.value}
                    onChange={e =>
                      this.setState({ expectedOutput: e.target.value })
                    }
                  />
                </Form.Group>
              </Form.Row>
            </Form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          
          <Button variant="primary" onClick={e => this.onSubmit(e)}>
            Save
          </Button>
          <Button variant="primary" onClick={e => this.onSubmit(e)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
