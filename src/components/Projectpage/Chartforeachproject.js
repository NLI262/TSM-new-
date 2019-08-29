import React from "react";
import { Pie } from "react-chartjs-2";
import { Modal } from "react-bootstrap";

export default class ChartForEachProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ["Project 1", "Project 2", "Project 3", "Project 4"],
        datasets: [
          {
            label: "Percentage of completion",
            data: [4, 70, 35, 63],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)"
            ]
          }
        ]
      }
    };
  }

  render() {
    return (
      <div className="chart">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">chart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="sidebar-two">
              <Pie data={this.state.chartData} options={{}} />
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}
