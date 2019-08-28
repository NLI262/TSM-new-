import React from "react";

import CreateTestcase from "./testCase1.js";

import { Button } from "react-bootstrap";

export default class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true
    };
  }

  render() {
    let addModalClose = () => this.setState({ addModalShow: false });

    var { isLoaded } = this.state;
    if (!isLoaded) {
      return <div>No Internet connection!</div>;
    } else {
      return (
        <section>
          <div className="column-layout">
            <Button
              onClick={() => this.setState({ addModalShow: true })}
              variant="outline-primary"
            >
              Create Testcase
            </Button>
          </div>
          <CreateTestcase
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </section>
      );
    }
  }
}
