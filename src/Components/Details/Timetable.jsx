import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core/'
import stationDetails from "../../Data/stationDetails"

// Timetable to be passed as props => []

const useStyles = makeStyles(theme => ({
  table: {
    // minWidth: 650,
  },
  tableHead : {
    backgroundColor: 'black',
  },
  tableCell : {
    color : 'white'
  }
}));


const tableDataList = stationDetails.stationWithEvaId.timetable.nextArrivals

export default function Timetable() {
  const classes = useStyles();

  return (
    <Table className={classes.table}>
    <TableHead className={classes.tableHead}>
        <TableRow>
        <TableCell className={classes.tableCell}>Train Number</TableCell>
        <TableCell className={classes.tableCell} align="right">Time</TableCell>
        <TableCell className={classes.tableCell} align="right">Platform Number</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {tableDataList.map((tableData) => (
        <TableRow key={tableData.trainNumber}>
            <TableCell component="th" scope="row">
            {tableData.trainNumber}
            </TableCell>
            {
                // Table data needs to be reviewed
            }
            <TableCell align="right">{tableData.time.split(" ")[4]}</TableCell>
            <TableCell align="right">{tableData.platform}</TableCell>
        </TableRow>
        ))}
    </TableBody>
    </Table>
  );
}