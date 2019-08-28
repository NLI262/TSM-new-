import React from "react";

import { Form, Col } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

export default class Editproject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      projectTitle: "",
      projectDescription: "",
      startDate: "",
      endDate: "",
      googleAutheticationId: localStorage.getItem("tokenid")
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log("props", this.props);
    this.setState(
      {
        id: this.props.data && this.props.data.id ? this.props.data.id : "",
        projectTitle:
          this.props.data && this.props.data.projectTitle
            ? this.props.data.projectTitle
            : "",
        projectDescription:
          this.props.data && this.props.data.projectDescription
            ? this.props.data.projectDescription
            : "",
        startDate:
          this.props.data && this.props.data.startDate
            ? this.props.data.startDate
            : "",
        endDate:
          this.props.data && this.props.data.endDate
            ? this.props.data.endDate
            : "",
        googleAutheticationId: localStorage.getItem("tokenid")
      },
      console.log("didMount", this.state)
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextprops data", nextProps);
    this.setState(
      {
        id: nextProps.data && nextProps.data.id ? nextProps.data.id : "",
        projectTitle:
          nextProps.data && nextProps.data.projectTitle
            ? nextProps.data.projectTitle
            : "",
        projectDescription:
          nextProps.data && nextProps.data.projectDescription
            ? nextProps.data.projectDescription
            : "",
        startDate:
          nextProps.data && nextProps.data.startDate
            ? nextProps.data.startDate
            : "",
        endDate:
          nextProps.data && nextProps.data.endDate ? nextProps.data.endDate : ""
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
              Edit a Project
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
                      value={this.state.projectTitle}
                      onChange={this.handleChange}
                      name="projectTitle"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control
                      type="text area"
                      as="textarea"
                      rows="3"
                      placeholder="Project Description"
                      value={this.state.projectDescription}
                      name="projectDescription"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Enter Start date"
                      value={this.state.startDate}
                      name="startDate"
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Enter End Date"
                      value={this.state.endDate}
                      name="endDate"
                      onChange={this.handleChange}
                    />
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
              submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
