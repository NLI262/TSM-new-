import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Table, Button } from "antd";

class Importtestcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      importData: [],
      filteredInfo: null
    };
  }
  componentDidMount() {
    fetch("/TSM/test/list")
      .then(response => {
        return response.json();
      })
      .then(result => {
        // console.log(result);
        this.setState({
          data: result
        });
      });
  }

  handleChange = (pagination, filters) => {
    this.setState({
      filteredInfo: filters
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  importSelected = () => {
    // history.pushState([data], [title], [url]);
    window.history.pushState(this.state.importData, null, null);
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null
    });
  };

  render() {
    const data = this.state.data;
    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
        this.setState({
          importData: selectedRowKeys
        });
      }
    };

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        width: "20%",
        key: "id"
      },
      {
        title: "Title",
        dataIndex: "testCaseTitle",
        key: "testCaseTitle",
        width: "20%"
      },
      {
        title: "Type",
        dataIndex: "testCaseType",
        key: "testCaseType",
        width: "20%",
        filters: [
          { text: "Smoke", value: "Smoke" },
          { text: "Functional", value: "Functional" },
          { text: "Regression", value: "Regression" },
          { text: "Non-Functional", value: "Non-Functi" }
        ],
        filteredValue: filteredInfo.testCaseType || null,
        onFilter: (value, record) =>
          record.testCaseType.slice(0, 10).includes(value)
      },
      {
        title: "Estimate",
        dataIndex: "testEstimate",
        width: "20%",
        key: "testEstimate",
        filters: [
          { text: "1", value: 1 },
          { text: "2", value: 2 },
          { text: "3", value: 3 },
          { text: "4", value: 4 },
          { text: "5", value: 5 },
          { text: "6", value: 6 },
          { text: "7", value: 7 },
          { text: "8", value: 8 }
        ],
        filteredValue: filteredInfo.testEstimate,
        onFilter: (value, record) => String(record.testEstimate).includes(value)
      },
      {
        title: "Priority",
        dataIndex: "testPriority",
        width: "15%",
        key: "testPriority",
        filters: [
          { text: "Low", value: "Low" },
          { text: "Medium", value: "Medium" },
          { text: "High", value: "High" }
        ],
        filteredValue: filteredInfo.testPriority || null,
        onFilter: (value, record) => record.testPriority.includes(value)
      }
    ];
    return (
      <div>
        <h3 align="center">View All Test Case</h3>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
        />
        <div align="center">
          {/* <Button onClick={this.clearFilters}>Clear filters</Button>
          &nbsp;&nbsp; */}
          <Button onClick={this.importSelected}>Export</Button>
        </div>
      </div>
    );
  }
}

export default Importtestcase;