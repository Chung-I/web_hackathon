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

  /*componentDidUpdate() {
    // fetch `/api/users/${id}` to get article and then set state...
    let url = 'https://www.dcard.tw/_api/posts/' + this.props.params.id;
    fetch(url).then(res => res.json())
    .then(json => {
      this.setState({article: json});
    });
  }*/
  render() {
    let content = this.state.article.content ? this.state.article.content : '';
    content = content.replace(/\n/g, "<br />");
    content = {__html: content};
    return (
      <div>
        <p dangerouslySetInnerHTML={content} />
      </div>
    );
  }
}

export default ArticlePage;
