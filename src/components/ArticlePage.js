import React, { Component, PropTypes } from 'react';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

class ArticlePage extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    // fetch `/api/users/${id}` to get user and then set state...
    fetch(`/api/${this.props.params.board}/${this.props.params.id}`).then(res => res.json())
    .then(json => {
      this.setState({user: json});
    });
  }

  componentDidUpdate() {
    // fetch `/api/users/${id}` to get user and then set state...
    fetch(`/api/${this.props.params.board}/${this.props.params.id}`).then(res => res.json())
    .then(json => {
      this.setState({user: json});
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
          <tr>
            {Object.keys(this.state.user).map(key => (
              <td>
                <a href={`#/users/${this.props.params.id}`}>{this.state.user[key]}</a>
              </td>))
            }
          </tr>
        </tbody>
      </table>
    );
  }
}

export default ArticlePage;
