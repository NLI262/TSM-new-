import React, {Component} from 'react';
import { Pie} from 'react-chartjs-2';

class ChartForEachProject extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
   
  }
componentDidMount()
{
    this.setState({
        chartData:this.props.chartData
    });
   
}
  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
      console.log(!this.props.chartData);
      
      if(!this.props.chartData)
      {
          return(
              <div>Loading</div>
          )
      }

    return (
      <div className="chart">
        
       <Pie
          data={this.props.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </div>
    )
  }
}

export default ChartForEachProject;