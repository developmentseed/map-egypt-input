'use strict';
var config = require('./config');

import React, { PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Index from './components/Index';
import Header from './components/Header';
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

const parseAuthHash = (nextState, replace) => {
  auth.parseHash(nextState.location.hash);
  replace({ pathname: '/' });
};

const alreadyAuth = (nextState, replace) => {
  if (auth.loggedIn()) {
    replace({ pathname: '/' });
  }
};

class App extends React.Component {
  static contextTypes = {
    router: T.object
  }

  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentWillMount () {
    this.setState({
      auth: auth
    });
  }

  logout () {
    this.state.auth.logout();
    this.context.router.push('/login');
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
      <div>
      {(component.props.route.auth.loggedIn()
        ? <Header logout={component.logout}/>
        : ''
      )}
        {children}
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} auth={auth}>
      <IndexRoute component={Index} onEnter={requireAuth} />
      <Route path="projects" component={ProjectList} onEnter={requireAuth} />
      <Route path="projects/new" component={NewProject} onEnter={requireAuth} />
      <Route path="projects/:id" component={Project} onEnter={requireAuth} />
      <Route path="projects/:id/edit" component={EditProject} onEnter={requireAuth} />
      <Route path="indicators" component={IndicatorList} onEnter={requireAuth} />
      <Route path="indicators/new" component={NewIndicator} onEnter={requireAuth} />
      <Route path="indicators/:id" component={Indicator} onEnter={requireAuth} />
      <Route path="indicators/:id/edit" component={EditIndicator} onEnter={requireAuth} />
      <Route path="login" component={Login} onEnter={alreadyAuth} />
      <Route path="access_token=:access_token" onEnter={parseAuthHash} />
    </Route>
  </Router>,
  document.querySelector('#site-canvas')
);
