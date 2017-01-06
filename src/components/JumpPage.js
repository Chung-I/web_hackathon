import React, { Component } from 'react';

class JumpPage extends Component {
  constructor() {
    super();
    this.state = {
      eventUrl: '',
      adminUrl: '',
    };
  }

  componentDidMount = async () => {
    // fetch `/api/users/${id}` to get article and then set state...
    this.setState({
      eventUrl: this.props.params.eventUrl,
      adminUrl: this.props.params.adminUrl
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>歡迎來到easyScheduling!</h1>
          </div>
        </div>
        <div className="row">
          <h2>Send this link to your invitees...</h2>
          <div className="col-md-12 text-center">
            <a href={`/form/${this.state.eventUrl}`}>link</a>
          </div>
        </div>
      </div>
    );
  }
}

export default JumpPage;
