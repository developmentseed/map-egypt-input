import React from 'react';
import AuthService from '../utils/AuthService';

class Login extends React.Component {
  render () {
    const component = this;
    let auth = component.props.auth;
    return (
      <div className="login">
        {auth.loggedIn()?"You are logged in!": "You are not logged in."}
        <button onClick={auth.login.bind(this)}>Login</button>
      </div>
    )
  }
}

export default Login;
