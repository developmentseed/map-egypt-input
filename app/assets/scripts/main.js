'use strict';
var config = require('./config');

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRedirect, hashHistory} from 'react-router';

import Login from './components/Login';
import Index from './components/Index';
import New from './components/New';
import Project from './components/Project';
import Edit from './components/Edit';
import AuthService from './utils/AuthService';

const auth = new AuthService(config.auth0_token, config.auth0_namespace);

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

class App extends React.Component {
  componentWillMount () {
    this.setState({
      auth: auth
    });
  }

  render () {
    const component = this;
    let children = null;
    if (component.props.children) {
      children = React.cloneElement(component.props.children, {
        auth: component.props.route.auth
      });
    }
    return (
      <div>{children}</div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} auth={auth}>
      <IndexRedirect to="/projects" />
      <Route path="projects" component={Index} />
      <Route path="projects/new" component={New} onEnter={requireAuth} />
      <Route path="projects/:id" component={Project} />
      <Route path="projects/:id/edit" component={Edit} onEnter={requireAuth} />
      <Route path="login" component={Login} />
      <Route path="access_token=:access_token" component={Login} />
    </Route>
  </Router>,
  document.querySelector('#site-canvas')
);

console.log.apply(console, config.consoleMessage);
console.log('Environment', config.environment);
