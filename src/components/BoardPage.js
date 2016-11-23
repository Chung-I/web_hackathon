import React, { Component, PropTypes } from 'react';

class BoardTable extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>hi</th>
            <th>hi</th>
            <th>hi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ho</td>
            <td>ho</td>
            <td>ho</td>
          </tr>
          <tr>
            <td>ha</td>
            <td>ha</td>
            <td>ha</td>
          </tr>
          <tr>
            <td>he</td>
            <td>he</td>
            <td>he</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class BoardPage extends Component {

  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    // fetch `/api/users` to get users and then set state...
    fetch(`/api/${this.props.params.board}/`).then(res => res.json())
    .then(json => {
      this.setState({ users: json });
    });
  }

  render() {
    return (
      <table className="table table-responsive">
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    );
  }
}

export default BoardPage;
