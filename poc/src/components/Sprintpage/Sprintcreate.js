import React from "react";
import TSMaxios from "../Axios/TSMaxios";
import { Form, Col } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

export default class Sprintcreate extends React.Component {
  state = {
    sprintName: "",
    projectId: " ",
    show: ""
  };
  componentDidMount() {
    this.setState({
      projectId: this.props.projectID ? this.props.projectID : " ",
      show: this.props.show
    });
  }

  onSubmit = e => {
    e.preventDefault();

    TSMaxios.post("/TSM/sprint/add", this.state)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.props.updateState(response.data);
          this.props.closeModal();
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
            Create New Sprint
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label> Sprint Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="sprint "
                    value={this.state.value}
                    onChange={e =>
                      this.setState({ sprintName: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Project Title</Form.Label>
                  <Form.Control
                    type="disabled"
                    value={this.props.projectTitle}
                  />
                </Form.Group>
              </Form.Row>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={async () => await this.props.onHide(this.state)}>
            {" "}
            Cancel
          </Button>
          <Button variant="primary" onClick={e => this.onSubmit(e)}>
            {" "}
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
