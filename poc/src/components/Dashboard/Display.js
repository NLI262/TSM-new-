import React from "react";
import { Card, CardDeck, CardColumns } from "react-bootstrap";
import Createproject from "./Createproject.js";
import { Link } from "react-router-dom";
import Editproject from "./Editproject.js";
import { Button, InputGroup , FormControl} from "react-bootstrap";

export default class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: true,
      visible: 5,
      editContent: null,
      search:"",
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
      fetch("https://cors-anywhere.herokuapp.com/http://f2c3baf6.ngrok.io/TSM/project/delete/" + id, {
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
    await fetch("https://cors-anywhere.herokuapp.com/http://f2c3baf6.ngrok.io/TSM/project/add/", {                                 // handle submit taken fom editproject file using props
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
  onchange=e=>{
    this.setState({ search: e.target.value })
}

  render() {
    let addModalClose = () => this.setState({ addModalShow: false });              // modal function for create projet
    let addModal_Close = () => this.setState({ addModal_Show: false });  // modal function for edit project
     const {search} = this.state;
    var { isLoaded , items} = this.state;
    const filterName= items.filter(item=>{
      return item.projectTitle.toLowerCase().indexOf(search.toLowerCase())!== -1
  })
    if (!isLoaded) {
      return <div>No Internet connection!</div>;
    } else {
      return (
        <section>
         
        <h4 className="project" style={{textAlign:"20px"}}>Recent Projects </h4>  
          <InputGroup size="sm" style={{ width: "600px" , left:"420px" ,  borderRadius: "25px"}}>
          <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1"><i class="fas fa-search"></i></InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl placeholder="Search For Projects" aria-describedby="basic-addon1"  onChange={this.onchange} />
  </InputGroup> 
  <br></br>
          <div className="column-layout">  
         
            {/* <div  className="main-column"> */}
            <div   className="main-column" style={{ background: '#ECECEC', padding: '30px' }}>
              
                                           
            <CardColumns>
               
              <Card style={{ width: "24rem", height: "10rem" , boxShadow:" 1px 1px #CCCCCC"}}>                       
                <Card.Body>
                  
                  <br></br>
                  <Button
                   
                    onClick={() => this.setState({ addModalShow: true })}
                    variant="light"
                  >
                   <i class="fas fa-plus fa-2x"></i>
                  </Button>
                </Card.Body>
              </Card>

              {filterName
                .slice(0, this.state.visible)
                .map(item=> {
                  return (                                                                        //mapping done for diplaying all projects and slice method used for load more button
                    <Card className="cardstyle" border="light" style={{ width: "24rem" }}>
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
            {/* <div className="part1"></div>
            <div className="part2"> </div> */}
            
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
            <Button
              className="load"
              onClick={this.loadMore}           // load more function declared to display only few projects
              type="button"
              className="load-more"
              variant="primary"
            >
              Load more
            </Button>
          )}
        </section>
      );
    }
  }
}
