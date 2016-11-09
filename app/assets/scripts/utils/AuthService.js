import { isTokenExpired } from './jwtHelper';

import reqwest from 'reqwest';
import Auth0 from 'auth0-js';

export default class AuthService {
  constructor (clientID, domain) {
    this.auth0 = new Auth0({ clientID, domain, responseType: 'token' });

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  request (url, method, options) {
    let headers = {};
    if (this.loggedIn()) {
      headers['Authorization'] = this.getToken();
    }

    let reqParams = Object.assign({}, {
      url,
      method,
      headers,
      type: 'json',
      contentType: 'application/json'
    }, options || {});

    return reqwest(reqParams);
  }

  login (params, onError) {
    this.auth0.login(params, onError);
  }

  signup (params, onError) {
    this.auth0.signup(params, onError);
  }

  parseHash (hash) {
    const authResult = this.auth0.parseHash(hash);
    if (authResult && authResult.idToken) {
      this.setToken(authResult.idToken);
    }
  }

  loggedIn () {
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  }

  setToken (idToken) {
    localStorage.setItem('id_token', idToken);
  }

  getToken () {
    return localStorage.getItem('id_token');
  }

  logout () {
    localStorage.removeItem('id_token');
  }
}
