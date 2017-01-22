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
import InvalidUrlPage from './components/InvalidUrlPage';


const validateUrl = (nextState, replace, callback) => {
  console.log(nextState.location.pathname);
  fetch(`/api${nextState.location.pathname}`)
      .then(response => response.json())
      .then(form => {
        console.log(form);
        if (form === null) {
          console.log('replace');
          replace({ pathname: '/invalidUrl' });
        }
        callback();
      })
      .catch(error => {
        // do some error handling here
        callback(error);
      });
};

render(
  (<Router history={browserHistory}>
    <Route path="/" component={HomePage} />
    <Route path="/invalidUrl" component={InvalidUrlPage} />
    <Route path="/create" component={CreateEventPage} />
    <Route path="/form/:eventUrl" component={UserFormFillingPage} onEnter={validateUrl} />
    <Route path="/form/:eventUrl/links/:adminUrl" component={JumpPage} />
    <Route path="/form/:eventUrl/thanks/:userUrl" component={UserJumpPage} />
    <Route path="/form/:eventUrl/update/:userUrl" component={UserUpdateFormPage} />
    <Route path="/result" component={PollResultPage} />
  </Router>),
  document.getElementById('root'),
);
