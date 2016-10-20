import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router'

export default class AuthService {
  constructor (clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {});
    this.lock.on('authenticated', this._doAuthentication.bind(this))

    this.login = this.login.bind(this) 
  }

  _doAuthentication(authResult) {
    this.setToken(authResult.idToken);
    browserHistory.replace('/#/home');
  }

  login() {
    this.lock.show(); 
  }

  loggedIn() {
    return !!this.getToken(); 
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
