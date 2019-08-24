import React from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Toolbar from '../dashboard/Toolbar';
import Chartx from '../ProjectPage/Chartx';
import Sprintcreate from './Sprintcreate.js';
import './ProjectPage.css';


// import Bar from './Bar.js';
// import Togglebutton from '../dashboard/Togglebutton.js';


export default class ProjectPage extends React.Component {


  state = {
    post: null,
    id: null,
    sprintList: [],

  }
  async componentDidMount() {

    let id = this.props.match.params.post_id;
    this.setState({ id: id });
    axios.get('TSM/project/list/' + id)

      .then(res => {
        this.setState({
          post: res.data
        })
        console.log('project overview', res.data);
        axios.get('TSM/sprint/list/find/' + id)
          .then(res => {
            this.setState({ sprintList: res.data })
            console.log('sprintlist', res.data);
          })

      })



  }



  render() {
    

    let addModalClose = () => this.setState({ addModalShow: false });
    let addModalChartClose = () => this.setState({ addModalChartShow: false });
    const { sprintList } = this.state;
    const post = this.state.post ? (
      <div className="post">
        <Toolbar drawerClickHandler={this.drawOpenClickHandler} />
        <br></br>


        <div className="pos1">
          {/* <Bar   show ={sideDrawerOpen}/>
           <Togglebutton/>  */}
          <div className="pos2">
            <Button onClick={() => this.setState({ addModalChartShow: true })}>Analysis</Button>
            <Chartx show={this.state.addModalChartShow} onHide={addModalChartClose} />


          </div>
          <div className="pos3">
          <p> id : {this.state.post.id}</p>
            <h4 className="center"> Title :  {this.state.post.projectTitle}</h4>
            <p> Description:   {this.state.post.projectDescription}</p>
            <p> Start Date : {this.state.post.startDate}</p>
            <p> End Date : {this.state.post.endDate}</p>
             </div>








          <div className="pos4">
            <Button onClick={() => this.setState({ addModalShow: true, getId: post })} > <i class="fa fa-plus" aria-hidden="true"></i>
            </Button>

          </div>
        </div>



        <Sprintcreate show={this.state.addModalShow} onHide={addModalClose}
          details={this.state.getId} />
        <br />
        <hr />

        {sprintList.map((sprintList) => {
          return (
            <li key={sprintList.id}>
              <p>{sprintList.id} {sprintList.sprintName}</p>  </li>);
        })}

      </div>
    ) : (
        <div className="center"></div>
      );


    return (<div>
      {post}


    </div>

    );
  }
}