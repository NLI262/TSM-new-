import React from "react";
import "antd/dist/antd.css";
import { Modal, Button, Table } from "antd";
import { Card } from 'antd';
import { Input ,TextArea} from 'antd';

export default class TestSummary extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
      history: [],
      id: '', 
      testCaseTitle: '',
      testCaseType: '',
      testPriority:'',
      testEstimate: '',
      prerequisites: '',
      steps: '',
      expectedOutput: '',
    };
  }

  componentDidMount() {
   let id = this.props.match.params.testid;
    this.setState({ id: id });
    console.log(id);

    //To fetch the last 3 test run result
    fetch("https://cors-anywhere.herokuapp.com/http://f2c3baf6.ngrok.io/TSM/testrun/last/"+id)
      .then(response => {
        return response.json();
      })
      .then(result => {
      // console.log(result);
        this.setState({
          history: result
        });
      });
     //get details of the particular testcase
     fetch("https://cors-anywhere.herokuapp.com/http://f2c3baf6.ngrok.io/TSM/test/list/"+id)
     .then(response => {
       return response.json();
     })
     .then(result => {
     // console.log(result);
     this.setState({
        id:result.id,
        testCaseTitle:result.testCaseTitle,
        testCaseType:result.testCaseType,
        testPriority:result.testPriority,
        testEstimate:result.testEstimate,
        prerequisites:result.prerequisites,
        steps: result.steps,
        expectedOutput: result.expectedOutput,
    });
     });
      
    //To fetch data from the backend
    fetch("https://cors-anywhere.herokuapp.com/http://cb6af570.ngrok.io/TSM/testrun/history/"+id)
      .then(response => {
        return response.json();
      })
      .then(result => {
        // console.log(result);
        this.setState({
          data: result
        });
      });
  }

  showModal = () => {
    //To display the modal
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    //To close the modal on the press off okay button
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    //To close the modal on the press of cancell button
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    const { TextArea } = Input;
    const data = this.state.data;
    const history = this.state.history;
    const columns = [
      {
        title: "Executed On",
        dataIndex: "lastUpdate",
        key: "lastUpdate"
      },
      {
        title: "Expected Output",
        dataIndex: "test.expectedOutput",
        key: "test.expectedOutput"
      },
      {
        title:"Executed By",
        dataIndex:"executedBy",
        key:"executedBy"
      },
     
      {
        title: "Actual Output",
        dataIndex: "actualOutput",
        key: "actualOutput"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status"
      },
      {
        title: "Attachment",
        dataIndex: "attachment",
        key: "attachment",
        render: text => (
          // eslint-disable-next-line
          <a>
            <font color="blue">
              <u>{text}</u>
            </font>
          </a>
        )
      }
    ];
    const last = [
        {
            title:"Executed On",
            dataIndex:"lastUpdate",
            key:"lastUpdate"
        },
        {
          title:"Executed By",
          dataIndex:"executedBy",
          key:"executedBy"
        },
        {
            title:"Actual Output",
            dataIndex:"actualOutput",
            key:"actualOutput"
        },
        {
            title:"Status",
            dataIndex:"status",
            key:"status"
        }
    ];
    
    return (
    <div>
      <div style={{backgroundColor: "#1890ff"}}><br/>
    <h1 style={{color:"white" , textAlign:"center"}}>{this.state.testCaseTitle}</h1><br/>
     </div>
    <Card bordered={false} style={{ width: '100%' }} >
      <div style={{color:"black"}}>
      <p>Type<Input type="text" value={this.state.testCaseType} disabled="disabled" style={{color:"black"}}/></p>
      <p>Estimate<Input type="text" value={this.state.testEstimate} disabled="disabled" style={{color:"black"}}/></p>
      <p>Priority<Input type="text" value={this.state.testPriority} disabled="disabled" style={{color:"black"}}/></p>
      <p>Prerequisites<TextArea rows={4} value={this.state.prerequisites} disabled="disabled" style={{color:"black"}}/></p>
      <p>Steps<TextArea rows={4} value={this.state.steps} disabled="disabled" style={{color:"black"}}/></p>
      <p>Expected Output<TextArea rows={4} value={this.state.expectedOutput} disabled="disabled" style={{color:"black"}}/></p>   
     </div>
      <h2 style={{backgroundColor: "#1890ff",color:"white"}}>Latest Test Run and Results</h2>
      <p>
        <Table
            columns={last}
            dataSource={history}
            pagination={false} /></p>
      <Button type="primary" onClick={this.showModal}>
          Load More
        </Button>
        <Modal
          title="Test Case Summary" 
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={850}
          footer={[
            null,
            null,
            ]}            
        >
          <Table //To display the data in a table
            columns={columns}
            dataSource={data}
            onChange={this.handleChange}
          />
        </Modal>
    </Card>
       
      </div>
    );
  }
    
    }