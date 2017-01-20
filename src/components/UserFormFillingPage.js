import React, { Component, PropTypes } from 'react';
import EventTimeBlock from './EventTimeBlock';

class UserFormFillingPage extends Component {

  constructor() {
    super();
    this.state = {
      eventUrl: '',
      startDate: '',
      endDate: '',
      startHour: '',
      endHour: '',
      daysSelected: [1, 2, 3, 4, 5, 6, 7],
      blockEnabled: {},
      blockChecked: {},
      userName: ''
    };
  }

  componentDidMount() {
    fetch(`/api/form/${this.props.params.eventUrl}`)
    .then(res => res.json())
    .then(json => {
      console.log(json.eventTime);
      this.setState({
        eventUrl: json.eventUrl,
        startDate: json.startDate,
        endDate: json.endDate,
        startHour: json.startHour,
        endHour: json.endHour,
        blockEnabled: json.eventTime,
        blockChecked: {}
      });
    });
  }

  handleUserNameChange = event => {
    this.setState({ userName: event.target.value });
  }

  handleBlockChange = event => {
    const newBlockChecked = this.state.blockChecked;
    newBlockChecked[event.target.id] = !newBlockChecked[event.target.id];
    this.setState({ blockChecked: newBlockChecked });
  }

  handleSubmit = async e => {
    const data = {
      userName: this.state.userName,
      availableTime: this.state.blockChecked
    };
    e.preventDefault();
    const myHeaders = new Headers();
    console.log(data);
    myHeaders.append('Content-Type', 'application/json');
    let res;
    let json;
    try {
      res = await fetch(`/api/form/${this.state.eventUrl}`,
        {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(data),
        });
      json = await res.json();
    } catch (err) {
      console.log(err);
    }
    const userUrl = json.userUrl;
    window.location.href = `${this.state.eventUrl}/thanks/${userUrl}`;
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
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            startHour={this.state.startHour}
            endHour={this.state.endHour}
            eventTime={this.state.eventTime}
            daysSelected={this.state.daysSelected}
            blockChecked={this.state.blockChecked}
            blockEnabled={this.state.blockEnabled}
            handleBlockChange={this.handleBlockChange}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default UserFormFillingPage;
