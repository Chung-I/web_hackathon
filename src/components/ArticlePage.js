import React, { Component, PropTypes } from 'react';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

class ArticlePage extends Component {
  constructor() {
    super();
    this.state = {
      article: {},
    };
  }

  componentDidMount() {
    // fetch `/api/users/${id}` to get article and then set state...
    let url = 'https://www.dcard.tw/_api/posts/' + this.props.params.id;
    fetch(url).then(res => res.json())
    .then(json => {
      this.setState({article: json});
    });
  }

  componentDidUpdate() {
    // fetch `/api/users/${id}` to get article and then set state...
    let url = 'https://www.dcard.tw/_api/posts/' + this.props.params.id;
    fetch(url).then(res => res.json())
    .then(json => {
      this.setState({article: json});
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.article.content}</p>
      </div>
    );
  }
}

export default ArticlePage;
