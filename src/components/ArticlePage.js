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
    content = content.split(/\n/);
    return (
      <div>
        {content.map(line => {
            if(line.match(/http.*jpg/)) {
              console.log(line);
              line = line.replace(/(http.*jpg)/, "<img className=\"img-fluid\" src=\"$1\" height=\"100px\" width=\"100px\" >");
              line = {__html: line};
              return (<p dangerouslySetInnerHTML={line} />);
            }
            else return (<p>{line}</p>);
          })
        }
      </div>
    );
  }
}

export default ArticlePage;
