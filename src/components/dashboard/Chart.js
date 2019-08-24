import React from 'react';
import { Bar} from 'react-chartjs-2';


export default class Chart extends React.Component
{
constructor(props)
{
super(props);
this.state={
chartData:{
    labels: ['Project 1', 'Project 2', 'Project 3', 'Project 4'],
    datasets:[
        {
          label:'Percentage of completion',
          data:[
            4,
            70,
            35,
            63
          ],
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ]
        }
      ]
    }

}

}

render()
{
    

    return(
<div className="chart">
  <div className="sidebar-one">
    {/* <Pie
    data = {this.state.chartData}
     options={{


       }}
      /> */}

 </div>
<div className="par">


  </div>


 <div className="sidebar-two"> 
 
 <Bar

data = {this.state.chartData}
options={{


       }}
/>
     </div>
</div>
 );
}

}