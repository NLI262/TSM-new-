import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

export default class Testcaseeditdelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    };
  }
  componentDidMount() {
    fetch("/TSM/test/list")
      .then(response => {
        return response.json();
      })
      .then(result => {
        console.log(result);
        this.setState({
          history: result
        });
      });
  }
  SimpleTable() {
    const classes = makeStyles(theme => ({
      root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
      },
      table: {
        minWidth: 650
      }
    }));
    const { history } = this.state;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Test id</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.history.map(
                function(item, key) {
                  return (
                    <TableRow key={item.id}>
                      <TableCell align="center">{item.id}</TableCell>
                      <TableCell align="center">{item.testCaseTitle}</TableCell>
                      <TableCell align="center">{item.status}</TableCell>
                      <TableCell align="center">
                        <Button>Edit</Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button>Delete</Button>
                      </TableCell>
                    </TableRow>
                  );
                }.bind(this)
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
  render() {
    return <div> {this.SimpleTable()} </div>;
  }
}
