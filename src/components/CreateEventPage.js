import React, { Component, PropTypes } from 'react';
import 'babel-polyfill';
import EventTimeBlock from './EventTimeBlock';
import fetch from 'isomorphic-fetch';

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
    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
    console.log(defaultDaysSelected);
    console.log(this.yyyymmdd(today));
    this.state = {
      eventName: '',
      daysSelected: defaultDaysSelected,
      startDate: this.yyyymmdd(today),
      endDate: this.yyyymmdd(sevenDaysLater),
      startHour: 8,
      endHour: 21,
      blockSelected: {}
    };
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
      (dd > 9 ? '' : '0') + dd
    ].join('-');
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

  updateBlockSelected = () => {
    const oldState = this.state;
    const dateRange = this.getAllDays(oldState.startDate, oldState.endDate);
    const hourRange = this.getAllHours(oldState.startHour, oldState.endHour);
    const newBlockSelected = {};
    hourRange.forEach(hour => {
      dateRange.forEach(date => {
        const timeBlock = `${this.yyyymmdd(date)}-${this.hh(hour)}`;
        const oldBlockSelected = oldState.blockSelected[`${timeBlock}`];
        newBlockSelected[`${timeBlock}`] = oldBlockSelected || false;
      });
    });
    this.setState({
      blockSelected: newBlockSelected
    });
  }

  handleEventNameChange = event => {
    this.setState({ eventName: event.target.value });
  }

  handleDayChange = event => {
    const newDaysSelected = this.state.daysSelected;
    const day = parseInt(event.target.id, 10);
    newDaysSelected[day] = !newDaysSelected[day];
    this.setState({ daysSelected: newDaysSelected });
    this.updateBlockSelected();
  }

  handleStartDateChange = event => {
    this.setState({ startDate: event.target.value });
    this.updateBlockSelected();
  }

  handleEndDateChange = event => {
    this.setState({ endDate: event.target.value });
    this.updateBlockSelected();
  }

  handleBlockChange = event => {
    const newBlockSelected = this.state.blockSelected;
    newBlockSelected[event.target.id] = !newBlockSelected[event.target.id];
    this.setState({ blockSelected: newBlockSelected });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const data = {
      eventName: this.state.eventName,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      startHour: this.state.startHour,
      endHour: this.state.endHour,
      eventTime: this.state.blockSelected,
      userData: []
    };
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let form;
    try {
      form = await fetch(`/api/form`,
        {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(data),
        });
    } catch (err) {
      console.log(err);
    }
    const eventUrl = form.eventUrl;
    const adminUrl = form.adminUrl;
    console.log(eventUrl);
    console.log(adminUrl);
  }

  render() {
    return (
      <div className="container col-md-12">
        <form onSubmit={this.handleSubmit}>
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
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
        <EventTimeBlock
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          startHour={this.state.startHour}
          endHour={this.state.endHour}
          daysSelected={this.state.daysSelected}
          clickable={false}
          blockSelected={this.state.blockSelected}
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
