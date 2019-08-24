import React from 'react';
import axios from 'axios';
import{Form, Col} from 'react-bootstrap';
import {Modal, Button} from 'react-bootstrap';


export default class Sprintcreate extends React.Component{
    
  state={
    // projectTitle:'',
    // projectDescription:'',
    // startDate:'',
    // endDate:'',
     
     
    sprintName: '',
    projectId :'',
   
   
  }
  componentDidMount(){
    console.log('props', this.props);
    this.setState({

      id: this.props.details  && this.props.details.id ? this.props.details.projectId : '',
      // projectTitle: this.props.data && this.props.data.projectTitle ? this.props.data.projectTitle: '',



    })
    console.log('got', this.state);
}





  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);  
    axios.post('/TSM/sprint/add', this.state)
    .then(response =>{console.log(response)})
    .catch( error =>{console.log(error)})  
    
             } 


render(){
    var x =window.location.href;
    console.log(x)
     var y= x.substring(x.lastIndexOf('/') +1)
    // y=y.replace(/%20/,' ')
     console.log(y)
    
return(
<Modal
       {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Create a new Sprint
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
<div>
    <Form>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label> sprint Name</Form.Label>
      <Form.Control type="text" placeholder="sprint "
       value= {this.state.value}
       onChange={ e=> this.setState({sprintName : e.target.value})}
      />
    </Form.Group>
     <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Project ID</Form.Label>
      <Form.Control type="disabled"   placeholder={y} 
     
     value= {this.state.value}
       onChange={ e=> this.setState({projectId : e.target.value})} 
    />      
    </Form.Group>
  </Form.Row>
   
   </Form>
    </div>
      </Modal.Body>
      <Modal.Footer>

     <Button variant='primary' onClick={e => this.onSubmit(e) } > submit</Button>
        
      </Modal.Footer>
    </Modal>
);
}
}