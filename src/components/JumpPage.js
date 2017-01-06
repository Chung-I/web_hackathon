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
    const eventUrl = this.props.params.eventUrl;
    try {
      const res = await fetch(`/api/form/${eventUrl}`);
      const json = await res.json();
      console.log(json);
    } catch (err) {
      console.log(err);
    }
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
          <div className="col-md-12 text-center">
            <a href></a>
          </div>
        </div>
      </div>
    );
  }
}

export default JumpPage;
