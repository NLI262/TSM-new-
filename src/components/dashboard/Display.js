import React from "react";
import { Card, CardColumns } from "react-bootstrap";
import Createproject from "./Createproject.js";
import { Link } from "react-router-dom";
import Editproject from "./Editproject.js";
import { Button } from "react-bootstrap";

export default class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      abc: [],                                                              // empty states
      isLoaded: true,
      visible: 5,
      editContent: null
    };

    this.loadMore = this.loadMore.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  loadMore() {
    this.setState(prev => {
      return { visible: prev.visible + 2 };                                   // load more function 
    });
  }

  async componentDidMount() {
    const items = await (await fetch(`TSM/project/list`)).json();               //fetch method to display all projects
    this.setState({ items });
  }

  deleteProject(id) {
    if (window.confirm("Are you sure want to delete?")) {                     // delete method to delete the paticular project
      fetch("/TSM/project/delete/" + id, {
        method: "DELETE"
      }).then(response => {
        if (response.status === 200) {
          alert("project deleted successfully");
          fetch("/TSM/project/all")
            .then(response => {
              return response.json();
            })
            .then(result => {
              // console.log(result);
              this.setState({
                websites: result
              });
            });
        }
      });
    }
  }

  editProject(id) {
    this.setState({ abc: id });
  }

  handleSubmit = async data => {
    await fetch("/TSM/project/add/", {                                 // handle submit taken fom editproject file using props
      method: "PUT",
      body: JSON.stringify({ ...data }),                               // put method in fetch to update state values 
      headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => {
      if (response.status === 200) {
        alert("project update successfully.");
      }
      this.setState({ addModal_Show: false });
    });
  };

  render() {
    let addModalClose = () => this.setState({ addModalShow: false });              // modal function for create projet
    let addModal_Close = () => this.setState({ addModal_Show: false });            // modal function for edit project

    var { isLoaded } = this.state;
    if (!isLoaded) {
      return <div>No Internet connection!</div>;
    } else {
      return (
        <section>
          <h4 className="project">Recent Projects</h4>

          <hr />
          <div className="column-layout">                                          
            <CardColumns className="main-column">
              <Card style={{ width: "14rem", height: "9rem" }}>                       
                <Card.Body>
                  <Button
                    onClick={() => this.setState({ addModalShow: true })}
                    variant="outline-primary"
                  >
                    <i className="far fa-plus-square fa-3x"></i>
                  </Button>
                </Card.Body>
              </Card>

              {this.state.items
                .slice(0, this.state.visible)
                .map((item, index) => {
                  return (                                                                        //mapping done for diplaying all projects and slice method used for load more button
                    <Card border="primary" style={{ width: "14rem" }}>
                      <Card.Body>
                        <Link to={"/" + item.id}>
                          {" "}
                          <Card.Title key={item.id}>
                            {" "}
                            {item.projectTitle}
                          </Card.Title>{" "}
                        </Link>
                        <hr />
                        <Card.Text>{item.projectDescription}</Card.Text>
                        <Button
                          onClick={() => {
                            this.setState({
                              addModal_Show: true,
                              editContent: item
                            });
                          }}
                          size="sm"
                          variant=" outline-primary"
                        >
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </Button>{" "}
                        &nbsp; &nbsp;
                        <Button
                          onClick={this.deleteProject.bind(this, item.id)}                          // calling delete fuction by id of project
                          size="sm"
                          variant=" outline-primary"
                        >
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </Button>{" "}
                        &nbsp; &nbsp;
                        <Link to={"/" + item.id}>
                          {" "}
                          <Button size="sm" variant=" outline-primary">
                            <i class="fas fa-arrow-right"></i>
                          </Button>{" "}
                        </Link>
                      </Card.Body>
                    </Card>
                  );
                })}
            </CardColumns>

            <div className="part1"></div>
            
          </div>

          <Createproject
            show={this.state.addModalShow}
            onHide={addModalClose}                             // show declared to open popup and onhide to close the popup
          />
          <Editproject
            data={this.state.editContent}
            show={this.state.addModal_Show}
            onHide={addModal_Close}
            onSubmit={this.handleSubmit}
          />

          {this.state.visible < this.state.items.length && (
            <button
              className="load"
              onClick={this.loadMore}           // load more function declared to display only few projects
              type="button"
              className="load-more"
            >
              Load more
            </button>
          )}
        </section>
      );
    }
  }
}
