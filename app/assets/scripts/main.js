'use strict';
var config = require('./config');

import React, {PropTypes as T} from 'react';
import ReactDOM from 'react-dom';
import {Link, Router, Route, IndexRedirect, hashHistory} from 'react-router';

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

const alreadyAuth = (nextState, replace) => {
  if (auth.loggedIn()) {
    replace({ pathname: '/projects' });
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
      <header className="header">
        <nav>
          <ul>
            <li><Link to='/'> MAP Egypt Dashboard</Link></li>
            <li><Link to='projects' className="browse-menu__item link--deco">Projects</Link></li>
            <li><Link to='indicators' className="browse-menu__item link--deco">Indicators</Link></li>
          </ul>
        </nav>
        <div className="nav-log">
          <ul>
            <li><a href="#" onClick={component.state.auth.login.bind(this)}>Log In</a></li>
            <li>
              {
                (component.props.route.auth.loggedIn()
                  ? <button className="btn button--primary button--small" onClick={component.logout}>Logout</button>
                  : <div></div>
                )
              }
            </li>
          </ul>
        </div>
      </header>
        {children}
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} auth={auth}>
      <IndexRedirect to="/login" />
      <Route path="projects" component={ProjectList} onEnter={requireAuth} />
      <Route path="projects/new" component={NewProject} onEnter={requireAuth} />
      <Route path="projects/:id" component={Project} onEnter={requireAuth} />
      <Route path="projects/:id/edit" component={EditProject} onEnter={requireAuth} />
      <Route path="indicators" component={IndicatorList} onEnter={requireAuth} />
      <Route path="indicators/new" component={NewIndicator} onEnter={requireAuth} />
      <Route path="indicators/:id" component={Indicator} onEnter={requireAuth} />
      <Route path="indicators/:id/edit" component={EditIndicator} onEnter={requireAuth} />
      <Route path="login" component={Login} onEnter={alreadyAuth} />
      <Route path="access_token=:access_token" component={Login} />
    </Route>
  </Router>,
  document.querySelector('#site-canvas')
);
