import React, { Component, PropTypes } from 'react';
import 'babel-polyfill';
import EventTimeBlock from './EventTimeBlock';
import fetch from 'isomorphic-fetch';

class CreateEventPage extends Component {
  static propTypes = {
    days: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor() {
    super();
    let defaultDaysSelected = [];
    for (let i = 0; i < 7; ++i) {
      defaultDaysSelected[i]= false;
    }
    this.state =  {
      eventName: '',
      daysSelected: defaultDaysSelected,
      startDate: '2016-12-01',
      endDate: '2016-12-11',
      startHour: '8',
      endHour: '21'
    };
  }

  /*componentDidUpdate() {
  }*/
  handleEventNameChange = (event) => {
    this.setState({ eventName: event.target.value });
  }

  handleDayChange = (event) => {
    let newDaysSelected = this.state.daysSelected;
    for (let i = 0; i < newDaysSelected.length; ++i) {
      if(('day' + i) === event.target.id) {
        newDaysSelected[i] = !newDaysSelected[i];
      }
    }
    this.setState({ daysSelected: newDaysSelected });
  }

  handleStartDateChange = (event) => {
    console.log(event.target.value);
    this.setState({ startDate:event.target.value });
  }

  handleEndDateChange = (event) => {
    this.setState({ endDate:event.target.value });
  }

  handleSubmit = (event) => {
    const data = {
      eventName: this.state.eventName,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      startHour: this.state.startHour,
      endHour: this.state.endHour,
      userData: []
    };
    console.log(data);
    fetch('/api/form/json/',
    {
        method: 'POST',
        body: JSON.stringify(data)
    });
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
                    id={'day' + idx}
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
          clickable={false}
        />
      </div>
    );
  }
}

CreateEventPage.defaultProps = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday', 'Sunday']
};

export default CreateEventPage;
