import React, { Component } from "react";

import TSMaxios from "../Axios/TSMaxios";
import { Card, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import Modulecreate from "../Modulecreate/Modulecreate";
import TestCase from "../Testcasepage/Testcasepage.js";

import TestCaseCreate from "../Testcasepage/Testcasecreate.js";

export default class SprintPage extends Component {
  state = {
    sprint: null,
    moduleList: [],
    moduleName: "",
    sprintId: "",
    testCase: {}
  };

  async componentDidMount() {
    let id = this.props.match.params.sprintid;

    await TSMaxios.get("/TSM/sprint/list/" + id)
    .then(response => {
      this.setState({
        sprint: response.data
      });

      //module
      TSMaxios.get("TSM/module/basedOnSprint/" + id).then(response => {
        this.setState({
          moduleList: response.data
        });
      });
    });
  }

  onTestCaseCreate = data => {
    this.setState({ addModalTestCaseShow: false, testCase: data });
  };

  addNewModule = data => {
    this.setState(prevState => ({
      moduleList: [...prevState.moduleList, data]
    }));
  };

  closeModal = () => {
    this.setState({ addModalModuleShow: false });
  };

  drawOpenClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  render() {
   
    let addModalTestCaseClose = () =>
      this.setState({ addModalTestCaseShow: false });
    let addModalModuleClose = () =>
      this.setState({ addModalModuleShow: false });
    const { moduleList } = this.state;
    const sprint = this.state.sprint ? (
      <div>
        <div>
          
          
          <br></br>

          <Modulecreate
            show={this.state.addModalModuleShow}
            onHide={addModalModuleClose}
            sprintName={this.state.sprint.sprintName}
            sprintID={this.state.sprint.id}
            updateState={this.addNewModule}
            closeModal={this.closeModal}
          />

          <TestCaseCreate
            show={this.state.addModalTestCaseShow}
            onHide={addModalTestCaseClose}
            create={this.state.createTest}
            onTestCaseCreate={this.onTestCaseCreate}
          />
        </div>
        <div>
          <br></br>
          <br></br>
          <Container>
            <Row>
              <Col sm={9}>
                {" "}
                <h3 style={{ textAlign: "left" }}>
                  {" "}
                  {this.state.sprint.sprintName}{" "}
                </h3>
              </Col>
              <Col sm={3}>
                {" "}
                <Button
                  onClick={() => this.setState({ addModalModuleShow: true })}
                >
                  Add Module
                </Button>
              </Col>
            </Row>
          </Container>
        </div>

        {moduleList.map(module => {
          return (
            <Card style={{ width: "60rem", left: "180px" }}>
              <Card.Body>
                <Card.Title>{module.moduleName} </Card.Title>
                <Card.Text>
                  <TestCase id={module.id} testCase={this.state.testCase} />
                </Card.Text>
                <Button variant="outline-primary">Import test case</Button>
                &nbsp; &nbsp;
                <Button
                  onClick={() =>
                    this.setState({
                      addModalTestCaseShow: true,
                      createTest: module
                    })
                  }
                  variant="outline-primary"
                >
                  Create Testcase
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    ) : (
      <div className="center">
        {" "}
        <p>loading...</p>
        <i class="fa fa-spinner fa-spin"></i>
      </div>
    );

    return <div>{sprint}</div>;
  }
}
