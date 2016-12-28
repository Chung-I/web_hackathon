import React, { Component, PropTypes } from 'react';
import EventTimeBlock from './EventTimeBlock';

class UserFormFillingPage extends Component {

  constructor() {
    super();
    this.state = {
      eventName: '',
      startDate: '',
      endDate: '',
      startHour: '',
      endHour: '',
      userName: ''
    };
  }

  componentDidMount() {
    fetch(`/api/form/${this.props.params.eventName}`).then(res => res.json())
    .then(json => {
      const formData = JSON.parse(json);
      this.setState({
        eventName: this.props.params.eventName,
        startDate: formData.startDate,
        endDate: formData.endDate,
        startHour: formData.startHour,
        endHour: formData.endHour,
      });
    });
  }

  ComponentDidUpdate() {
    fetch(`/api/form/${this.props.params.eventName}`).then(res => res.json())
    .then(json => {
      const formData = JSON.parse(json);
      this.setState({
        eventName: formData.eventName,
        startDate: formData.startDate,
        endDate: formData.endDate,
        startHour: formData.startHour,
        endHour: formData.endHour
      });
    });
  }

  handleUserNameChange = event => {
    this.setState({ userName: event.target.value });
  }

  handleSubmit = e => {
    const data = {
      userName: this.state.userName,
      userData: this.eventTBlk.state.blockSelected
    };
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch(`/api/form/${this.state.eventName}/${this.state.userName}`,
      {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(data),
      });
  }

  render() {
    return (
      <div className="container col-md-12">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">UserName</label>
            <input
              type="text"
              className="form-control"
              value={this.state.userName}
              onChange={this.handleUserNameChange}
            />
          </div>
          <EventTimeBlock
            ref={eventTBlk => { this.eventTBlk = eventTBlk; }}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            startHour={this.state.startHour}
            endHour={this.state.endHour}
            clickable
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default UserFormFillingPage;
