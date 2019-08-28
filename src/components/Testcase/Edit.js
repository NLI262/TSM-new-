import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { Col, Form} from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
//import axios from 'axios';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',type:'',priority:'',estimate:'',
      prerequisite:'',steps:'',
      
      modal: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount(){
    console.log('props',this.props);
    this.setState({
      testCaseTitle: this.props.data && this.props.data.testCaseTitle ? this.props.data.testCaseTitle:'',
      testCaseType: this.props.data && this.props.data.testCaseType ? this.props.data.testCaseType :'',
      testPriority: this.props.data && this.props.data.testPriority ? this.props.data.testPriority :'',
      testEstimate: this.props.data && this.props.data.testEstimate ? this.props.data.testEstimate:'',
      prerequisite: this.props.data && this.props.data.prerequisite ? this.props.data.prerequisite:'',
      steps: this.props.data && this.props.data.steps ? this.props.data.steps:''},
      console.log('didMount',this.state)
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextprops data', nextProps) ;
    this.setState({
      testCaseTitle: nextProps.data && nextProps.data.testCaseTitle ? nextProps.data.testCaseTitle : '',
      testCaseType: nextProps.data && nextProps.data.testCaseType ? nextProps.data.testCaseType: '',
      testPriority:nextProps.data && nextProps.data.testPriority ? nextProps.data.testPriority:'',
      testEstimate:nextProps.data  && nextProps.data.testEstimate ? nextProps.data.testEstimate:'',
      prerequisite:nextProps.data && nextProps.data.prerequisite ? nextProps.data.prerequisite:'',
      steps:nextProps.data && nextProps.data.steps ? nextProps.data.steps:'',
  },  console.log('nextProps',this.state)
  );
  }
  handleChange(event) {
    event.preventDefault();
      this.setState({
          [event.target.name]: event.target.value
      })
  }

  

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}Edit</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}
        {...this.props}>
          <ModalHeader toggle={this.toggle}>Edit the Testcase</ModalHeader>
          <ModalBody>
          
          <Form>
          <FormGroup>
          <Label for="testCaseTitle">Title</Label>
          <Input type="text" name="testCaseTitle" id="testCaseTitle" placeholder="enter the title" 
          value={this.state.title}
          onChange={this.handleChange} 
          />
        </FormGroup>
        
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="testCaseType">Type</Label>
              <Input type="select" name="testCaseType" id="testCaseType"
               value={this.state.type}
               onChange={this.handleChange} >
              <option value="">Select</option>
          <option value="Functional">Functional</option>
          <option value="Non-Functional">Non-Functional</option>
          <option value="Regression">Regression</option>
          <option value="Smoke">Smoke</option>
          </Input>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="testPriority">Priority</Label>
              <Input type="select" name="testPriority" id="testPriority"
               value={this.state.priority}
               onChange={this.handleChange}>
              <option value="">Select</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for= "testEstimate">Estimate</Label>
              <Input type="number" name="testEstimate" id="testEstimate" placeholder="Enter Estimate" min={1} max={8}
               value={this.state.estimate}
               onChange={this.handleChange} 
               />
            </FormGroup>  
          </Col>
        </Row>
        <FormGroup>
          <Label for="prerequisite">Prerequisite</Label>
          <Input type="textarea" name="prerequisite" id="prerequisite" 
           value={this.state.prerequisite}
           onChange={this.handleChange} 
           />
        </FormGroup>
        <FormGroup>
          <Label for="steps">Steps</Label>
          <Input type="textarea" name="steps" id="steps" 
           value={this.state.steps}
           onChange={this.handleChange}
           />
        </FormGroup>
        
        </Form>

          </ModalBody>
          <ModalFooter>
            
            <Button variant='primary' onClick={async () => await this.props.onSubmit(this.state)} > Submit</Button>
            <Button color="primary" onClick={this.toggle}>Close</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}