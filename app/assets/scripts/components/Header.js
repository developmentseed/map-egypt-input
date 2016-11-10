import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {

  render () {
    const { logout } = this.props;
    return (
      <header className='header'>
        <div className="wrapper-content">
          <nav>
            <ul>
              <li><Link to='/'> MAP Egypt Dashboard</Link></li>
              <li><Link to='projects' className="browse-menu__item link--deco">Projects</Link></li>
              <li><Link to='indicators' className="browse-menu__item link--deco">Indicators</Link></li>
            </ul>
          </nav>
          <div className='nav-log'>
            <ul>
              <li><button className='btn button--primary button--small' onClick={logout}>Logout</button></li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
