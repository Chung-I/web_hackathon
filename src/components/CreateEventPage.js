import React, { Component, PropTypes } from 'react';
import 'babel-polyfill';
import EventTimeBlock from './EventTimeBlock';
import fetch from 'isomorphic-fetch';
import DatePicker from 'material-ui/DatePicker';
import clone from '../utils/utils';

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
};


class CreateEventPage extends Component {
  static propTypes = {
    days: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(props) {
    super();
    const defaultDaysSelected = [];
    props.days.forEach((day, idx) => {
      defaultDaysSelected[idx] = true;
    });
    const startDate = new Date();
    let endDate = new Date();
    endDate = new Date(endDate.getDate() + 7);
    const startHour = 8;
    const endHour = 21;

    this.state = {
      eventName: '',
      daysSelected: defaultDaysSelected,
      startDate,
      endDate,
      startHour,
      endHour,
      blockChecked: {}
    };
  }

  getAllDays = (startDate, endDate) => {
    const s = clone(startDate);
  // Temp variable for updating a[]
    let nS = clone(startDate);
    const e = clone(endDate);
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


  getBlockEnabled = () => {
    const blockEnabled = {};
    const dateRange = this.getAllDays(this.state.startDate, this.state.endDate);
    const hourRange = this.getAllHours(this.state.startHour, this.state.endHour);
    hourRange.forEach(hour => {
      dateRange.filter(date => (this.state.daysSelected[date.getDay()]))
      .forEach(date => {
        const timeBlock = `${this.yyyymmdd(date)}-${this.hh(hour)}`;
        blockEnabled[timeBlock] = true;
      });
    });
    return blockEnabled;
  }


  hh = hour => ((hour > 9 ? '' : '0') + hour);


  yyyymmdd = date => {
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();

    return [date.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('-');
  };


  handleEventNameChange = event => {
    this.setState({ eventName: event.target.value });
  }


  handleDayChange = event => {
    const newDaysSelected = this.state.daysSelected;
    const day = parseInt(event.target.id, 10);
    newDaysSelected[day] = !newDaysSelected[day];
    this.setState({ daysSelected: newDaysSelected });
  }

  handleStartDateChange = (event, date) => {
    this.setState({ startDate: date });
  }

  handleEndDateChange = (event, date) => {
    this.setState({ endDate: date });
  }

  handleBlockChange = event => {
    const newBlockChecked = this.state.blockChecked;
    newBlockChecked[event.target.id] = !newBlockChecked[event.target.id];
    this.setState({ blockChecked: newBlockChecked });
  }

  handleSubmit = async () => {
    const blockEnabled = this.getBlockEnabled();
    const eventTime = {};
    Object.getOwnPropertyNames(blockEnabled).forEach(key => {
      const available = this.state.blockChecked[key];
      if (available) eventTime[key] = this.state.blockChecked[key];
    });
    const data = {
      eventName: this.state.eventName,
      startDate: this.yyyymmdd(this.state.startDate),
      endDate: this.yyyymmdd(this.state.endDate),
      startHour: this.state.startHour,
      endHour: this.state.endHour,
      eventTime,
      userData: []
    };
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let res;
    let json;
    try {
      res = await fetch(`/api/form`,
        {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(data),
        });
      json = await res.json();
    } catch (err) {
      console.log(err);
    }

    const eventUrl = json.eventUrl;
    const adminUrl = json.adminUrl;
    window.location.href = `form/${eventUrl}/links/${adminUrl}`;
  }


  render() {
    return (
      <div className="container col-md-12">
        <form>
          <div className="form-group" onChange={this.handleEventNameChange}>
            <label htmlFor="UserName">User Name</label>
            <input
              type="text"
              className="form-control"
              id="eventName"
              placeholder="Enter Event Name"
              value={this.state.eventName}
            />
          </div>
          <div style={optionsStyle}>
            <DatePicker
              onChange={this.handleStartDateChange}
              floatingLabelText="Start Date"
              defaultDate={this.state.startDate}
            />
            <DatePicker
              onChange={this.handleEndDateChange}
              floatingLabelText="End Date"
              defaultDate={this.state.endDate}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={this.state.startDate}
              onChange={this.handleStartDateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              className="form-control"
              value={this.state.endDate}
              onChange={this.handleEndDateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="day">Select Days</label>
            {this.props.days.map((day, idx) => (
              <div className="form-check" key={idx}>
                <label className="form-check-label">
                  <input
                    id={idx}
                    checked={this.state.daysSelected[idx]}
                    onChange={this.handleDayChange}
                    type="checkbox"
                  />{day}
                </label>
              </div>)
            )}
          </div>
          <div className="row">
            <a
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >Submit</a>
          </div>
        </form>
        <EventTimeBlock
          startDate={this.yyyymmdd(this.state.startDate)}
          endDate={this.yyyymmdd(this.state.endDate)}
          startHour={this.state.startHour}
          endHour={this.state.endHour}
          daysSelected={this.state.daysSelected}
          blockChecked={this.state.blockChecked}
          blockEnabled={this.getBlockEnabled()}
          handleBlockChange={this.handleBlockChange}
        />
      </div>
    );
  }
}

CreateEventPage.defaultProps = {
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday']
};

export default CreateEventPage;
