import React from 'react';
import { render } from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';
import './bootstrap/css/bootstrap.min.css';
import './bootstrap/css/bootstrap-theme.min.css';
import HomePage from './components/HomePage';
import CreateEventPage from './components/CreateEventPage';
import UserFormFillingPage from './components/UserFormFillingPage';
import PollResultPage from './components/PollResultPage';
import JumpPage from './components/JumpPage';
import UserJumpPage from './components/UserJumpPage';
import UserUpdateFormPage from './components/UserUpdateFormPage';

render(
  (<Router history={browserHistory}>
    <Route path="/" component={HomePage} />
    <Route path="/create" component={CreateEventPage} />
    <Route path="/form/:eventUrl" component={UserFormFillingPage} />
    <Route path="/form/:eventUrl/links/:adminUrl" component={JumpPage} />
    <Route path="/form/:eventUrl/thanks/:userUrl" component={UserJumpPage} />
    <Route path="/form/:eventUrl/update/:userUrl" component={UserUpdateFormPage} />
    <Route path="/result" component={PollResultPage} />
  </Router>),
  document.getElementById('root'),
);
