import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import HomePage from './HomePage';
import BoardPage from './BoardPage';
import ArticlePage from './ArticlePage';


class App extends Component {


  state = {
    route: window.location.hash.substr(1),
  };

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1),
      });
    });
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={HomePage} />
        <Route path="/:board" component={BoardPage} />
        <Route path="/:board/:id" component={ArticlePage} />
        <Route path="*" component={HomePage} />
      </Router>
    );
  }
}


export default App;
