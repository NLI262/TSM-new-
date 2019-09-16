import React from 'react'
import TSMaxios from '../Axios/TSMaxios';
import {Table , Button} from 'react-bootstrap';
import {Link } from 'react-router-dom';
import Edit from './Edittestcase';
export default class TestCase extends React.Component{
  constructor(props){
    super(props);
    this.deleteTestcase = this.deleteTestcase.bind(this);
  }
    state={
        testCase:[],
        editContent:null
    };
     async componentDidMount(){
       
         
     await TSMaxios.get ("/TSM/test/basedOnModule/" + this.props.id)    
      
     .then(response=>{
         this.setState({
          testCase: response.data   
         })
         
     })
    }

    componentWillReceiveProps(nextProps)
    {
      
      if(nextProps.testCase)
      this.setState(prevState =>
        {
          return{
          testCase:[...prevState.testCase,nextProps.testCase]
          }
      })
    }
    deleteTestcase(id,module_id) {
    if (window.confirm("Are You Sure Want To Delete?")) {
      fetch('https://cors-anywhere.herokuapp.com/http://f2c3baf6.ngrok.io/TSM/import/delete/' + module_id +'/'+id, {///TSM/import//delete/{moduleId}/{testcaseId}
        method: 'DELETE'
       })
      .then(response => {
        if (response.status === 200) {
          alert("project deleted successfully");
         
         this.setState(prevState => {
            
          return{
          
          testCase:[...prevState.testCase.filter(e => e.id !==id)]
                 
          }})
         
            }
        
      });
    }
  }
  

  handleSubmit = async(data) => {
    await fetch(`https://cors-anywhere.herokuapp.com/http://f2c3baf6.ngrok.io/TSM/test/${this.props.id}/add`, {                                 // handle submit taken fom editproject file using props
      method: "PUT",
      body: JSON.stringify({ ...data }),                               // put method in fetch to update state values 
      headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => {
      
         this.setState(prevState => {
            console.log(prevState.testCase);
          return{
          
           testCase:[...prevState.testCase.filter(e => e.id !==data.id)]
                 
          }
          
      })

      this.setState(prevState => {
            
        return{
          addModal_Show: false,
          testCase:[...prevState.testCase,data]
               
        }
        
    })

    
    });
  };
    render()
    {
      let addModal_Close = () => this.setState({ addModal_Show: false });
        const testCase = this.state.testCase ? (
            <div>
              
         
              <div>
            

            <Table striped bordered hover size="sm">
            <thead>
              <tr>
                
                <th>Test Case </th>
                <th>Edit</th>
                <th>Delete</th>
                <th> Run</th>
              </tr>
            </thead>
            <tbody>
            {this.state.testCase.map(test => {
               
                return(
              <tr>
              
               <Link to={ `/testcase/${test.id}`} > <td>{test.testCaseTitle}</td> </Link>
                <td> <Button size="sm"
                          variant=" outline-primary"> <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                            onClick={() => { this.setState({ addModal_Show: true, editContent : test }) }}
                          ></i></Button></td>
                <td><Button size="sm"
                          variant=" outline-primary" 
                          onClick={this.deleteTestcase.bind(this, test.id,this.props.id)}> 
                          <i class="fa fa-trash-o" aria-hidden="true"></i></Button></td>
                <td>
                <Link  to={ `/testexecution/${test.id}`}> 
                <Button size="sm"
                   variant=" outline-primary"> 
                <i class="fas fa-play"></i></Button> </Link>
                     </td>
                </tr>
                   );
                    })}
               
                </tbody>
                </Table>
            </div>
            <Edit data={this.state.editContent} show={this.state.addModal_Show} onHide={addModal_Close} onSubmit={this.handleSubmit}/>
             </div>
        ):(
        <div>lost




        </div>)



        return(
        <div>
       {testCase}
        
        
           </div>
               );
                }

    }
