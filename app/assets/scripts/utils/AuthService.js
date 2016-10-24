import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';
import { isTokenExpired } from './jwtHelper';

import reqwest from 'reqwest';

export default class AuthService {
  constructor (clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {});
    this.lock.on('authenticated', this._doAuthentication.bind(this))

    this.login = this.login.bind(this) 
  }

  _doAuthentication(authResult) {
    this.setToken(authResult.idToken);
    browserHistory.replace('/#/projects');
  }

  request (url, method, options) {
    let headers = {};
    if (this.loggedIn()) {
      headers['Authorization'] = this.getToken();
    }

    let req_params = Object.assign({}, {
      url, 
      method, 
      headers,
      type: 'json',
      contentType: 'application/json'
    }, options || {});

    return reqwest(req_params);
  }

  login() {
    this.lock.show(); 
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !isTokenExpired(token); 
  }

  setToken(idToken) {
    // Set auth token in local storage
    localStorage.setItem('id_token', idToken) 
  }

  getToken(idToken) {
    return localStorage.getItem('id_token');
  }

  logout() {
    // Clear the session storage
    localStorage.removeItem('id_token');
  }
}
