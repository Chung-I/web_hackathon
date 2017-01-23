import React, { Component, PropTypes } from 'react';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import '../css/EventTimeBlock.css';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn,
  TableRow, TableRowColumn } from 'material-ui/Table';

class EventTimeBlock extends Component {
  static propTypes = {
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    startHour: PropTypes.number.isRequired,
    endHour: PropTypes.number.isRequired,
    handleBlockChange: PropTypes.func,
    blockEnabled: PropTypes.object,
    blockChecked: PropTypes.object,
    daysSelected: PropTypes.array,
    checkable: PropTypes.bool,
    open: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
  };

  handleMouseDown = e => {
    console.log(`mouse down: ${e.target}`);
  }

  handleMouseUp = e => {
    console.log(`mouse up: ${e.target}`);
  }

  handleMouseOver = e => {
    console.log(`mouse over: ${e.target}`);
  }

  getAllDays = (startDate, endDate) => {
    const s = new Date(startDate);
  // Temp variable for updating a[]
    let nS = new Date(startDate);
    const e = new Date(endDate);
    const a = [];

    while (s <= e) {
      a.push(nS);
      nS = new Date(s.setDate(
        s.getDate() + 1
      ));
    }

    return a;
  };

  getAllHours = (startHour, endHour) => {
    let sh = +startHour;
    const eh = +endHour;
    const a = [];
    while (sh <= eh) {
      a.push(sh);
      sh += 1;
    }
    return a;
  };

  yyyymmdd = date => {
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();

    return [date.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd,
    ].join('-');
  };

  hh = hour => ((hour > 9 ? '' : '0') + hour);

  render() {
    const dateRange = this.getAllDays(this.props.startDate, this.props.endDate);
    const hourRange = this.getAllHours(this.props.startHour, this.props.endHour);

    const TableExampleSimple = () => (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableRowColumn>1</TableRowColumn>
            <TableRowColumn>John Smith</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>2</TableRowColumn>
            <TableRowColumn>Randal White</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>3</TableRowColumn>
            <TableRowColumn>Stephanie Sanders</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>Steve Brown</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );

    const actions = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onTouchTap={this.props.handleClose}
      />,
    ];

    const element = timeBlock => (this.props.checkable ?
      (<Checkbox
        id={timeBlock}
        label={timeBlock}
        type="checkbox"
        checked={this.props.blockChecked[timeBlock] || false}
        onCheck={e => this.props.handleBlockChange(e)}
      />) :
      (<div>
        <RaisedButton
          label={timeBlock}
          onTouchTap={() => this.props.handleOpen()}
        />
        <Dialog
          title={`poll result for time block: ${timeBlock}`}
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={() => this.props.handleClose()}
        >
          Open a Date Picker dialog from within a dialog.
          <DatePicker hintText="Date Picker" />
        </Dialog>
      </div>));

    return (
      <table className="time-table">
        <tbody>{
          hourRange.map(hour => (
            <tr className="spaceUnder">{dateRange.filter(date => (this.props.daysSelected[date.getDay()]))
              .map(date => {
                const timeBlock = `${this.yyyymmdd(date)}-${this.hh(hour)}`;
                const hourable = this.props.blockEnabled[timeBlock];
                return (hourable ?
                  (<td
                    onMouseDown={this.handleMouseDown}
                    onMouseOver={this.handleMouseOver}
                    onMouseUp={this.handleMouseUp}
                    className="slot no-line-break space-at-right"
                  >{element(timeBlock)}
                  </td>) : (
                    <td
                      className="slot no-line-break space-at-right"
                    >&nbsp;
                    </td>)
                );
              })}</tr>
            ))
        }</tbody>
      </table>
    );
  }
}

EventTimeBlock.defaultProps = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday', 'Sunday'],
  daysSelected: [1, 2, 3, 4, 5, 6, 7],
  open: false,
  handleOpen: () => {},
  handleClose: () => {}
};

export default EventTimeBlock;
