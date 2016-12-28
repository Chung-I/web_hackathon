import React, { Component, PropTypes } from 'react';
import 'babel-polyfill';
import EventTimeBlock from './EventTimeBlock';
import fetch from 'isomorphic-fetch';

class CreateEventPage extends Component {
  static propTypes = {
    days: PropTypes.arrayOf(PropTypes.integer).isRequired,
  };

  constructor(props) {
    super();
    const defaultDaysSelected = [];
    props.days.forEach((day, idx) => {
      defaultDaysSelected[idx] = false;
    });
    const today = new Date();
    console.log(defaultDaysSelected);
    console.log(this.yyyymmdd(today));
    this.state = {
      eventName: '',
      daysSelected: defaultDaysSelected,
      startDate: this.yyyymmdd(today),
      endDate: this.yyyymmdd(today),
      startHour: 8,
      endHour: 21
    };
  }

  yyyymmdd = (date) => {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
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

  handleStartDateChange = event => {
    this.setState({ startDate: event.target.value });
  }

  handleEndDateChange = event => {
    this.setState({ endDate: event.target.value });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const data = {
      eventName: this.state.eventName,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      startHour: this.state.startHour,
      endHour: this.state.endHour,
      userData: []
    };
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    try {
      const form = await fetch(`/api/form`,
        {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(data),
        });
    } catch (err) {
      console.log(err);
    }
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
          <select className="custom-select">
            <option >Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
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
