import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Table, Button } from "antd";

class Importtestcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      //   returnData:[],
      filteredInfo: null,
      sortedInfo: null
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

  handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null
    });
  };

  render() {
    const data = this.state.data;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    };

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "Title",
        dataIndex: "testCaseTitle",
        key: "testCaseTitle"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        filters: [
          { text: "Pass", value: "pass" },
          { text: "Fail", value: "fail" },
          { text: "Not Run", value: "not run" }
        ],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value)
      },
      {
        title: "Type",
        dataIndex: "testCaseType",
        key: "testCaseType",
        filters: [
          { text: "Smoke", value: "Smoke" },
          { text: "Functional", value: "Functional" },
          { text: "Regression", value: "Regression" },
          { text: "Non-Functional", value: "Non" }
        ],
        filteredValue: filteredInfo.testCaseType || null,
        onFilter: (value, record) => record.testCaseType.includes(value)
      },
      {
        title: "Estimate",
        dataIndex: "testEstimate",
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
        onFilter: (value, record) => record.testEstimate.includes(value)
      },
      {
        title: "Priority",
        dataIndex: "testPriority",
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
          <Button onClick={this.clearFilters}>Clear filters</Button>
          &nbsp;&nbsp;
          <Button onClick={this.returnSelected}>Export</Button>
        </div>
      </div>
    );
  }
}

export default Importtestcase;
