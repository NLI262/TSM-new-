import React, { Component } from 'react';
import './App.css';
import Chart from './component/Chart';
import axios from "axios";

class Piechart extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{},
      dataFromDB: [  ],
    }
  }

 
  componentDidMount(){
    this.getChartData();
  }


  async getChartData(){
    const id=384;
   await axios.get("https://cors-anywhere.herokuapp.com/http://550c0cc1.ngrok.io/TSM/chart/"+id , {
      headers: {
            "Content-type" : "application/json;Access-Control-Allow-Origin: 'http://550c0cc1.ngrok.io'; charset=UTF-8",
            Authorization:''
      }
    })
    .then(res => {
      console.log(res.data);
      this.setState({
      dataFromDB: res.data,
       })
    })
    
    this.setState({
      chartData:{
        labels: ['passed', 'failed', 'notExecuted' ],
        datasets:[
          {
            label:'Projects status',
            data : this.state.dataFromDB,
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              
            ]
          }
        ]
      }
    });
    
  }

  render() {
    
    return (
      
        <div>
        <Chart chartData={this.state.chartData} location="projects" legendPosition="bottom"/>
      </div>
    );
  }
}

export default Piechart;