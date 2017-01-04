// entry page for event creator
import React, { Component } from 'react';

class HomePage extends Component {
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
            <a className="btn btn-primary" href="/create">建立事件</a>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
