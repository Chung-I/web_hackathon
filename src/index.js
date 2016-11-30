import React from 'react';
import { render } from 'react-dom';

import { Router, Route, hashHistory } from 'react-router';
import './bootstrap/css/bootstrap.min.css';
import './bootstrap/css/bootstrap-theme.min.css';
import HomePage from './components/HomePage';
import CreateEventPage from './components/CreateEventPage';
import UserFormFillingPage from './components/UserFormFillingPage';

render(
  (<Router history={hashHistory}>
    <Route path="/" component={HomePage} />
    <Route path="/create" component={CreateEventPage} />
    <Route path="/form/:formName" component={UserFormFillingPage} />
  </Router>),
  document.getElementById('root'),
);
