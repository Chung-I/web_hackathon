import React, { Component, PropTypes } from 'react';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import '../css/EventTimeBlock.css';

class EventTimeBlock extends Component {
  static propTypes = {
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    startHour: PropTypes.number.isRequired,
    endHour: PropTypes.number.isRequired,
    clickable: PropTypes.bool,
    handleBlockChange: PropTypes.func,
    blockSelected: PropTypes.object,
    daysSelected: PropTypes.array
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
    let s = new Date(startDate);
    const e = new Date(endDate);
    const a = [];

    while (s <= e) {
      a.push(s);
      s = new Date(s.setDate(
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

    return (
      <table className="time-table">
        <tbody>{
          hourRange.map(hour => (
            <tr className="spaceUnder">{dateRange.filter(date => (this.props.daysSelected[date.getDay()]))
              .map(date => {
                const timeBlock = `${this.yyyymmdd(date)}-${this.hh(hour)}`;
                let hourable;
                if (this.props.eventTime) {
                  hourable = this.props.eventTime[timeBlock];
                } else {
                  hourable = true;
                }
                return (hourable ?
                  (<td
                    onMouseDown={this.handleMouseDown}
                    onMouseOver={this.handleMouseOver}
                    onMouseUp={this.handleMouseUp}
                    className="slot space-at-right"
                  >
                    <input
                      id={timeBlock}
                      type="checkbox"
                      onChange={e => this.props.handleBlockChange(e)}
                    />{timeBlock}
                  </td>) : (
                    <td
                      className="slot space-at-right"
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
    'Friday', 'Saturday', 'Sunday']
};

export default EventTimeBlock;
