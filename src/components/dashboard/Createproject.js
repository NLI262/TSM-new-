import React from "react";
import axios from "axios";
import { Form, Col } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

export default class Createproject extends React.Component {
  state = {
    projectTitle: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
    googleAutheticationId: localStorage.getItem("tokenid")
  };
  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post("/TSM/project/add", this.state)
      .then(response => {
        console.log(response);
        window.location.reload(true);
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
            Create a new Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Project Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title of Your Project"
                    value={this.state.value}
                    onChange={e =>
                      this.setState({ projectTitle: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Project Description</Form.Label>
                  <Form.Control
                    type="text area"
                    as="textarea"
                    rows="3"
                    placeholder="Project Description"
                    value={this.state.value}
                    onChange={e =>
                      this.setState({ projectDescription: e.target.value })
                    }
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter Start date"
                    value={this.state.value}
                    onChange={e => this.setState({ startDate: e.target.value })}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter End Date"
                    value={this.state.value}
                    onChange={e => this.setState({ endDate: e.target.value })}
                  />
                </Form.Group>
              </Form.Row>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={e => this.onSubmit(e)}>

            {" "}
            submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
