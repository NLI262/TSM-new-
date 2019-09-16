import React from "react";
import TSMaxios from "../Axios/TSMaxios";
import { Form, Col } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

export default class Sprintcreate extends React.Component {
  state = {
    moduleName: "",
    sprintId: "",
    show:"",

  };


  componentDidMount() {

    
    this.setState({
     sprintId:
       this.props.sprintID 
         ? this.props.sprintID
         : " ",
         show : this.props.show
   });
  
 }

  onSubmit = e => {
    e.preventDefault();

    TSMaxios
      .post("/TSM/module/add", this.state) //submit a module for a sprint
      .then(response => {
        console.log(response);
        if(response.status===200)
        {
        
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
            Create New Module
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label> Module Name</Form.Label>        
                  <Form.Control              // enter module name
                    type="text"
                    placeholder="Module Name "
                    value={this.state.value}
                    onChange={e =>
                      this.setState({ moduleName: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Sprint Id</Form.Label>
                  <Form.Control
                    type="disabled"
                    value={this.props.sprintName}
                    
                  />
                </Form.Group>
              </Form.Row>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>            
          <Button variant="primary" onClick={e => this.onSubmit(e)}>     
            {" "}
            Save                  
          </Button>
        </Modal.Footer>    
      </Modal>
    );
  }
}
