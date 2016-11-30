import React, { Component, PropTypes } from 'react';
import EventTimeBlock from './EventTimeBlock';

class UserFormFillingPage extends Component {

  constructor() {
    super();
    this.state = {
      startDate: '',
      endDate: '',
      startHour: '',
      endHour: '',
      userName: ''
    };
  }

  componentDidMount() {
    fetch(`/api/form/{this.props.params.formName}`).then(res => res.json())
    .then(json => {
      console.log(json);
      this.setState({json});
    });
  }

  handleUserNameChange = (event) => {
    this.setState({userName: event.target.value});
  }

  handleSubmit = () => {

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
          clickable={true}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    );
  }
}

export default UserFormFillingPage;
