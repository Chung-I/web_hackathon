import React, { Component, PropTypes } from 'react';
import EventTimeBlock from './EventTimeBlock';

class UserUpdateFormPage extends Component {

  constructor() {
    super();
    this.state = {
      eventUrl: '',
      startDate: '',
      endDate: '',
      startHour: '',
      endHour: '',
      daysSelected: [1, 2, 3, 4, 5, 6, 7],
      blockChecked: {},
      blockEnabled: {},
      userName: '',
      userUrl: ''
    };
  }

  componentDidMount = async () => {
    let res;
    let json;
    try {
      res = await fetch(`/api/form/${this.props.params.eventUrl}`);
      json = await res.json();

      this.setState({
        eventUrl: json.eventUrl,
        startDate: json.startDate,
        endDate: json.endDate,
        startHour: parseInt(json.startHour, 10),
        endHour: parseInt(json.endHour, 10),
        blockEnabled: json.eventTime
      });
    } catch (err) {
      console.log(err);
    }
    const userUrl = this.props.params.userUrl;
    const data = json.userData.find(user => user.userUrl === userUrl);
    console.log(data);
    this.setState({
      userName: data.userName,
      userUrl,
      blockChecked: data.availableTime
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
      userUrl: this.state.userUrl,
      availableTime: this.state.blockChecked
    };
    console.log(data);
    e.preventDefault();
    const myHeaders = new Headers();
    console.log(data);
    myHeaders.append('Content-Type', 'application/json');
    let res;
    let json;
    try {
      res = await fetch(`/api/form/${this.state.eventUrl}`,
        {
          method: 'PUT',
          headers: myHeaders,
          body: JSON.stringify(data),
        });
      json = await res.json();
    } catch (err) {
      console.log(err);
    }
    window.location.href = `/form/${this.state.eventUrl}/thanks/${this.state.userUrl}`;
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
            blockChecked={this.state.blockChecked}
            blockEnabled={this.state.blockEnabled}
            daysSelected={this.state.daysSelected}
            handleBlockChange={this.handleBlockChange}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default UserUpdateFormPage;
