import React from "react";
import { Card, CardDeck, CardColumns } from "react-bootstrap";
import Createproject from "./Createproject.js";
import { Link } from "react-router-dom";
import Editproject from "./Editproject.js";
import { Button } from "react-bootstrap";

export default class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: true,
      visible: 5,
      editContent: null
    };

    this.loadMore = this.loadMore.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  loadMore() {
    this.setState(prev => {
      return { visible: prev.visible + 4 };                                   // load more function 
    });
  }

  async componentDidMount() {
  
    const items = await (await fetch(`https://cors-anywhere.herokuapp.com/http://f2c3baf6.ngrok.io/TSM/project/list`)).json();               //fetch method to display all projects
    this.setState({ items });
  }

  deleteProject(id) {
    if (window.confirm("Are you sure want to delete?")) {                     // delete method to delete the paticular project
      fetch("/TSM/project/delete/" + id, {
        method: "DELETE"
      }).then(response => {
        if (response.status === 200) {
          alert("project deleted successfully");
         
         this.setState(prevState => {
            
          return{
          
          items:[...prevState.items.filter(e => e.id !==id)]
                 
          }})
         
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
      if(response.status===200)
      {
         this.setState(prevState => {
            
          return{
          
          items:[...prevState.items.filter(e => e.id !==data.id)]
                 
          }
          
      })

      this.setState(prevState => {
            
        return{
          addModal_Show: false,
                items:[...prevState.items,data]
               
        }
        
    })

    }
    });
  };
  addNewProject = (data)=>
  {
    this.setState(prevState => ({
      items: [...prevState.items, data]
    }))
  }

  closeModal = ()=>
  {
    this.setState({ addModalShow: false });
  }

  render() {
    let addModalClose = () => this.setState({ addModalShow: false });              // modal function for create projet
    let addModal_Close = () => this.setState({ addModal_Show: false });            // modal function for edit project

    var { isLoaded } = this.state;
    if (!isLoaded) {
      return <div>No Internet connection!</div>;
    } else {
      return (
        <section>
         

          <hr />
          <h4 className="project" style={{textAlign:"20px"}}>Recent Projects </h4>   
          <div className="column-layout">  
         
            <div  className="main-column">
                                           
            <CardColumns>
               
              <Card style={{ width: "17rem", height: "9rem" }}>                       
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
                    <Card border="primary" style={{ width: "17rem" }}>
                      <Card.Body>
                        <Link to={`/project/${item.id}`}>
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
  </div>
            <div className="part1"></div>
            <div className="part2"> </div>
            
          </div>

          <Createproject
            show={this.state.addModalShow}
            onHide={addModalClose} 
            updateState= {this.addNewProject}
            closeModal= {this.closeModal}                            // show declared to open popup and onhide to close the popup
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
