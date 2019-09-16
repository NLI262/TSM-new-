import React from "react";
import TSMaxios from "../Axios/TSMaxios";
import { Button, Spinner } from "react-bootstrap";

import ChartForEachProject from "./Chartforeachproject";
import Sprintcreate from "../Sprintpage/Sprintcreate.js";
import "./Projectpage.css";
import { CardColumns, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


export default class ProjectPage extends React.Component {
  state = {
    post: null,
    id: null,
    sprintList: [],
    chartData: {},
    dataFromDB: []
  };
  async componentDidMount() {
    let id = this.props.match.params.post_id;
    this.setState({ id: id });

    TSMaxios.get("/TSM/project/list/" + id)
    .then(res => {
      this.setState({
        post: res.data
      });

      TSMaxios.get("/TSM/sprint/list/find/" + id).then(res => {
        this.setState({ sprintList: res.data });
      });
    });
    this.getChartData();
  }

  async getChartData() {
    const id = 384;
    await TSMaxios.get("/TSM/chart/" + id).then(res => {
      console.log(res.data);
      this.setState({
        dataFromDB: res.data
      });
    });

    this.setState({
      chartData: {
        labels: ["passed", "failed", "notExecuted"],
        datasets: [
          {
            label: "Projects status",
            data: this.state.dataFromDB,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)"
            ]
          }
        ]
      }
    });
  }

  addNewSprint = data => {
    this.setState(prevState => ({
      sprintList: [...prevState.sprintList, data]
    }));
  };

  closeModal = () => {
    this.setState({ addModalSprintShow: false });
  };
  drawOpenClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  render() {
    

    let addModalSprintClose = () =>
      this.setState({ addModalSprintShow: false });

    const { sprintList } = this.state;
    const post = this.state.post ? (
      <div className="post">
       
        <br></br>
        <br></br>
        <br></br>
        <Container>
          <Row>
            <Col sm={6}>
              <Card className="overview">
                <Card.Body>
                <table
                style={{ width: "400px", height: "220px", fontSize: "20px" }}
              >
                <tr>
                  <td>Title :</td>
                  <td>{this.state.post.projectTitle}</td>
                </tr>
                <tr>
                  <td>Description:</td>
                  <td>{this.state.post.projectDescription}</td>
                </tr>
                <tr>
                  <td> Start Date :</td>
                  <td>{this.state.post.startDate}</td>
                </tr>
                
              </table>
              </Card.Body>
              </Card>
            </Col>
            <Col sm={6}>
              <ChartForEachProject
                chartData={this.state.chartData}
                location="projects"
                legendPosition="bottom"
              />
            </Col>
          </Row>
        </Container>

        <Sprintcreate
          show={this.state.addModalSprintShow}
          onHide={addModalSprintClose}
          projectTitle={this.state.post.projectTitle}
          projectID={this.state.post.id}
          updateState={this.addNewSprint}
          closeModal={this.closeModal}
        />
        <br />
        <hr />
        <h4 style={{ color: "blue", backgroundColor: "lightblue" }}>
          Recent sprints
        </h4>
        <CardColumns className="main-column">
          <Card style={{ width: "14rem", height: "9rem" }}>
            <Card.Body>
              <Button
                onClick={() => this.setState({ addModalSprintShow: true })}
                variant="outline-primary"
              >
                <i className="far fa-plus-square fa-3x"></i>
              </Button>
            </Card.Body>
          </Card>

          {sprintList.map(sprintList => {
            console.log("sprint lost", sprintList);
            return (
              <div>
                <Card border="primary" style={{ width: "14rem" }}>
                  <Card.Body>
                    <Link
                      to={`/sprint/${this.props.match.params.post_id}/${sprintList.id}`}
                    >
                      {" "}
                      <Card.Title> {sprintList.sprintName}</Card.Title>{" "}
                    </Link>
                    <hr />
                    <Card.Text></Card.Text>
                    <Link
                      to={
                        "/" +
                        this.props.match.params.post_id +
                        "/" +
                        sprintList.id
                      }
                    >
                      <Button size="sm" variant=" outline-primary">
                        <i class="fas fa-arrow-right"></i>
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </CardColumns>
      </div>
    ) : (
     
        <Spinner className="spinner" animation="border" />
    
    );

    return <div>{post}</div>;
  }
}
