import React from 'react';

class Login extends React.Component {
  render () {
    const component = this;
    let auth = component.props.auth;
    return (
      <div className="login">
        {auth.loggedIn() ? <h2>You are logged in!</h2> : <h2>Log in to continue</h2>}
        <button className="btn button--primary" onClick={auth.login.bind(this)}>Login</button>
      </div>
    );
  }
}

export default Login;
