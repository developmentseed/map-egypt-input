'use strict';
var config = require('./config');

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRedirect, hashHistory} from 'react-router';

import Login from './components/Login';
import ProjectList from './components/ProjectList';
import NewProject from './components/NewProject';
import Project from './components/Project';
import EditProject from './components/EditProject';
import IndicatorList from './components/IndicatorList';
import NewIndicator from './components/NewIndicator';
import Indicator from './components/Indicator';
import EditIndicator from './components/EditIndicator';
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
      <IndexRedirect to="/login" />
      <Route path="projects" component={ProjectList} />
      <Route path="projects/new" component={NewProject} onEnter={requireAuth} />
      <Route path="projects/:id" component={Project} />
      <Route path="projects/:id/edit" component={EditProject} onEnter={requireAuth} />
      <Route path="indicators" component={IndicatorList} />
      <Route path="indicators/new" component={NewIndicator} onEnter={requireAuth} />
      <Route path="indicators/:id" component={Indicator} />
      <Route path="indicators/:id/edit" component={EditIndicator} onEnter={requireAuth} />
      <Route path="login" component={Login} />
      <Route path="access_token=:access_token" component={Login} />
    </Route>
  </Router>,
  document.querySelector('#site-canvas')
);

console.log.apply(console, config.consoleMessage);
console.log('Environment', config.environment);
