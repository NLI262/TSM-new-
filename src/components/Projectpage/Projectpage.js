import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Toolbar from "../Dashboard/Toolbar";
import ChartForEachProject from "./Chartforeachproject";
import Sprintcreate from "./Sprintcreate.js";
import "./Projectpage.css";
import { CardColumns, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class ProjectPage extends React.Component {
  state = {
    post: null,
    id: null,
    sprintList: []
  };
  async componentDidMount() {
    let id = this.props.match.params.post_id;
    this.setState({ id: id });
    axios
      .get("TSM/project/list/" + id)

      .then(res => {
        this.setState({
          post: res.data
        });
        // console.log("project overview", res.data);
        axios.get("TSM/sprint/list/find/" + id).then(res => {
          this.setState({ sprintList: res.data });
          // console.log("sprintlist", res.data);
        });
      });
  }

  render() {
    let addModalSprintClose = () =>
      this.setState({ addModalSprintShow: false });
    let addModalChartClose = () => this.setState({ addModalChartShow: false });
    const { sprintList } = this.state;
    const post = this.state.post ? (
      <div className="post">
        <Toolbar drawerClickHandler={this.drawOpenClickHandler} />
        <br></br>

        <div className="pos1">
          <div className="pos2">
            <Button onClick={() => this.setState({ addModalChartShow: true })}>
              Analysis
            </Button>
            <ChartForEachProject
              show={this.state.addModalChartShow}
              onHide={addModalChartClose}
            />
          </div>
          <div className="pos3">
            <p> id : {this.state.post.id}</p>
            <h4 className="center"> Title : {this.state.post.projectTitle}</h4>
            <p> Description: {this.state.post.projectDescription}</p>
            <p> Start Date : {this.state.post.startDate}</p>
            <p> End Date : {this.state.post.endDate}</p>
          </div>

          <div className="pos4"></div>
        </div>

        <Sprintcreate
          show={this.state.addModalSprintShow}
          onHide={addModalSprintClose}
        />
        <br />
        <hr />

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
            console.log(sprintList);
            return (
              <div>
                <Card border="primary" style={{ width: "14rem" }}>
                  <Card.Body>
                    <Link
                      to={
                        "/" +
                        this.props.match.params.post_id +
                        "/" +
                        sprintList.id
                      }
                    >
                      {" "}
                      <Card.Title> {sprintList.sprintName}</Card.Title>{" "}
                    </Link>
                    <hr />
                    <Card.Text></Card.Text>
                    <Button size="sm" variant=" outline-primary">
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </Button>{" "}
                    &nbsp; &nbsp;
                    <Button size="sm" variant=" outline-primary">
                      <i class="fa fa-trash-o" aria-hidden="true"></i>
                    </Button>{" "}
                    &nbsp; &nbsp;
                    <Button size="sm" variant=" outline-primary">
                      <i class="fas fa-arrow-right"></i>
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </CardColumns>
      </div>
    ) : (
      <div className="center"></div>
    );

    return <div>{post}</div>;
  }
}
