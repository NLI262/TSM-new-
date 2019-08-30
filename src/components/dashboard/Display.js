import React from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import Createproject from './Createproject.js';

import { Link } from 'react-router-dom';
import Editproject from './Editproject.js';

import { Button } from 'react-bootstrap';

export default class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      abc: [],
      isLoaded: true,
      visible: 5,
      editContent: null
    }

    this.loadMore = this.loadMore.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  loadMore() {
    this.setState((prev) => {
      return { visible: prev.visible + 2 };
    });
  }

  async componentDidMount() {
    const items = await (await fetch(`TSM/project/list`)).json();
    this.setState({ items });

  }


  deleteProject(id) {
    if (window.confirm("Are you sure want to delete?")) {
      fetch('/TSM/project/delete/' + id, {
        method: 'DELETE'
      }).then(response => {
        if (response.status === 200) {
          alert("project deleted successfully");
          window.location.reload(true);
          fetch('/TSM/project/all')
            .then(response => {
              return response.json();
            }).then(result => {
              console.log(result);
              this.setState({
                websites: result
              });
            });
        }
      });
    }
  }

  editProject(id){
    this.setState({abc: id})
  }

  handleSubmit = async (data) => {
    await fetch('/TSM/project/add/', {
          method: 'PUT',
          body: JSON.stringify({...data}),
          headers: { "Content-type": "application/json; charset=UTF-8" }
      }).then(response => {
              if(response.status === 200) {
                  alert("project update successfully.");
              }
              this.setState({ addModal_Show: false})
              
          });
}


  render() {
    let addModalClose = () => this.setState({ addModalShow: false });
    let addModal_Close = () => this.setState({ addModal_Show: false });



    var { isLoaded } = this.state;
    if (!isLoaded) {
      return (<div>No Internet connection!</div>);
    }

    else {
      return (
        <section>
          <br></br>
          <h4 className="project">Recent Projects</h4>
          <br></br>
          <hr/>
          <div className="column-layout">

            <CardColumns className="main-column" >
              <Card style={{ width: '14rem', height: '9rem' }}>
                <Card.Body>


                  <Button onClick={() => this.setState({ addModalShow: true })} variant="outline-primary"><i className="far fa-plus-square fa-3x"></i></Button>
                </Card.Body>
              </Card>

              {this.state.items.slice(0, this.state.visible).map((item, index) => {
                return (

                  <Card border="primary" style={{ width: '14rem' }}>


                    <Card.Body >

                      <Link to={'/' + item.id} > <Card.Title key={item.id}>  {item.projectTitle}</Card.Title> </Link>
                      <hr />
                      <Card.Text >
                        {item.projectDescription}

                      </Card.Text>
                      <Button onClick={() => { this.setState({ addModal_Show: true, editContent : item }) }} size="sm" variant=" outline-primary"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button> &nbsp; &nbsp;
         <Button onClick={this.deleteProject.bind(this, item.id)} size="sm" variant=" outline-primary"><i class="fa fa-trash-o" aria-hidden="true"></i></Button> &nbsp; &nbsp;
        <Link to={'/' + item.id} > <Button size="sm" variant=" outline-primary"><i class="fas fa-arrow-right"></i></Button> </Link>


                    </Card.Body>
                  </Card>



                );
              })}

            </CardColumns>

            <div className="part1"></div>
            {/* <div className='part2'></div> */}
          </div>

          <Createproject show={this.state.addModalShow} onHide={addModalClose}  />
          <Editproject data={this.state.editContent} show={this.state.addModal_Show} onHide={addModal_Close} onSubmit={this.handleSubmit}/>

          {this.state.visible < this.state.items.length &&
            <button className="load" onClick={this.loadMore} type="button" className="load-more">Load more</button>
          }


        </section>



      );

    }


  }

}





