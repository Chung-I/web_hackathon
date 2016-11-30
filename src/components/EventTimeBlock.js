import React, { Component, PropTypes } from 'react';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

class EventTimeBlock extends Component {
  static propTypes = {
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    startHour: PropTypes.string.isRequired,
    endHour: PropTypes.string.isRequired,

  };

  constructor(props) {
    super();
    const dateRange = this.getAllDays(props.startDate, props.endDate);
    const hourRange = this.getAllHours(props.startHour, props.endHour);
    let newBlockSelected = {};
    hourRange.forEach(hour => {
      dateRange.forEach(date => {
        const timeBlock = this.yyyymmdd(date) + '-' + this.hh(hour);
        newBlockSelected[timeBlock] = false;
      });
    });

    this.state = {
      blockSelected: newBlockSelected
    };
  }

  getAllDays = (startDate, endDate) => {
    let s = new Date(startDate);
    let e = new Date(endDate);
    let a = [];

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
    let eh = +endHour;
    let a = [];
    while (sh <= eh) {
      a.push(sh);
      sh += 1;
    }
    return a;
  };

  yyyymmdd = (date) => {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [date.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + (dd - 1)
    ].join('-');
  };

  hh = (hour) => {
    return (hour > 9 ? '' : '0') + hour;
  }

  handleBlockChange = (event) => {
    let newBlockSelected = this.state.blockSelected;
    newBlockSelected[event.target.id] = !newBlockSelected[event.target.id];
    this.setState({ daysSelected: newBlockSelected });
  }

  render() {
    const dateRange = this.getAllDays(this.props.startDate, this.props.endDate);
    const hourRange = this.getAllHours(this.props.startHour, this.props.endHour);

    return (
      <div>{
        hourRange.map(hour => (
          <div>{dateRange.map(date => {
            let timeBlock = this.yyyymmdd(date) + '-' + this.hh(hour);
            return (
              <label className="btn btn-info btn-sm">
                {this.props.clickable ? (<input
                  id={timeBlock}
                  type="checkbox"
                  onChange={this.handleBlockChange}
                />) : null}
                {timeBlock}
              </label>
            );
          })}</div>
          ))
      }</div>
    );
  }
}

EventTimeBlock.defaultProps = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday', 'Sunday']
};
/*<div className="container">
  {hourRange.map(hour => {
    const h = this.hh(hour);
    return (
      <div className="row">
        {dateRange.map(date => {
          const dh = this.yyyymmdd(date) + h;
          return (<button key={dh}>{dh}</button>);
        })}
      </div>
    );
  })}
</div>*/

export default EventTimeBlock;
