import React, { Component } from "react";
import Toolbar from "../Dashboard/Toolbar.js";
import axios from "axios";
import { Card, Table, Button } from "react-bootstrap";
import Modulecreate from "./Modulecreate";

export default class SprintPage extends Component {
  state = {
    sprint: null,
    moduleList: [],
    moduleName: "",
    sprintId: "",
    tesCase: []
  };

  async componentDidMount() {
    let id = this.props.match.params.sprintid;
    //console.log(id);
    await axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://550c0cc1.ngrok.io/TSM/sprint/list/" +
          id,
        {
          headers: {
            "Access-Control-Allow-Origin": "http://550c0cc1.ngrok.io",
            "Content-Type": "application/json"
          }
        }
      )

      .then(response => {
        this.setState({
          sprint: response.data
        });
        console.log("each sprint" + id + "", response.data);
   
        //module
        
        axios
          .get(
            " https://cors-anywhere.herokuapp.com/http://550c0cc1.ngrok.io/TSM/module/basedOnSprint/" +
              id,
            {
              headers: {
                "Access-Control-Allow-Origin": "http://550c0cc1.ngrok.io",
                "Content-Type": "application/json"
              }
            }
          )
          .then(response => {
            this.setState({
              moduleList: response.data
            });
            console.log("Module list" + id + "", response.data);
            

            axios
              .get(
                " https://cors-anywhere.herokuapp.com/http://550c0cc1.ngrok.io/TSM/test/display/" +
                  id,
                {
                  headers: {
                    "Access-Control-Allow-Origin": "http://550c0cc1.ngrok.io",
                    "Content-Type": "application/json"
                  }
                }
              )

              .then(response => {
                this.setState({
                  testCase: response.data
                });
                 console.log("testCase", response);
               console.log("id", id);
              }); // not replacing module id
          });
        });
     
  }

  render() {
    let addModalModuleClose = () =>
      this.setState({ addModalModuleShow: false });
    const { moduleList } = this.state;
    const sprint = this.state.sprint ? (
      <div>
        <div>
          <Toolbar />
          <br></br>
          <Modulecreate
            show={this.state.addModalModuleShow}
            onHide={addModalModuleClose}
          />
          <Button onClick={() => this.setState({ addModalModuleShow: true })}>
            ADD Module
          </Button>
        </div>
        <div>
          <p> {this.state.sprint.sprintName} </p>
        </div>

        <Card style={{ width: "30rem", left: "500px" }}>
          <Card.Body>
            <Card.Title>{this.state.sprint.sprintName}</Card.Title>

            <Card.Text>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>TestCase</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Run</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Text>
            <Card.Link href="#">Add Module</Card.Link>
            <Card.Link href="#">Add test case</Card.Link>
          </Card.Body>
        </Card>
        {moduleList.map(moduleList => {
          console.log("neat response", moduleList);
          return (
            <Card style={{ width: "30rem", left: "500px" }}>
              <Card.Body>
                <Card.Title>{moduleList.moduleName} </Card.Title>

                <Card.Text>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>TestCase</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Run</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@mdo</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Text>
                <Card.Link href="#">import test case</Card.Link>
                <Card.Link href="#">Add test case</Card.Link>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    ) : (
      <div className="center"> lost</div>
    );

    return <div>{sprint}</div>;
  }
}
