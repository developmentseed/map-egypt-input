import React, {PropTypes as T} from 'react';
import { Link } from 'react-router';

const config = require('../config');
const apiRoot = config.api_root;

class Index extends React.Component {
  static contextTypes = {
    router: T.object
  }

  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentWillMount () {
    const component = this;
    component.props.auth.request(`${apiRoot}/projects`, 'get')
      .then(function (resp) {
        component.setState({
          list: resp
        });
      });
  }

  logout () {
    const component = this;
    component.props.auth.logout();
    component.context.router.push('/projects');
  }

  render () {
    const component = this;
    if (!component.state) {
      return (<div></div>);
    }
    const {list} = component.state;
    let listItems = list.map((item) => <li key={item.id}><Link to={`/projects/${item.id}`}>{item.name}</Link></li>);

    return (
      <div>
        <header className="header">
          <nav>
            <ul>
              <li>MAP Egypt Dashboard</li>
              <li><a className="browse-menu__item link--deco" href="#">Projects</a></li>
              <li><a className="browse-menu__item link--deco" href="#">Indicators</a></li>
            </ul>
          </nav>
          <div className="nav-log">
            <ul>
              <li><a href="#">Log In</a></li>
              <li>
                {
                  (component.props.auth.loggedIn()
                    ? <button className="btn button--primary button--small" onClick={this.logout}>Logout</button>
                    : <div></div>
                  )
                }
              </li>
            </ul>
          </div>
        </header>
        <div className="section">
          <h1 className="header-page-main">Projects</h1>
          <Link to='projects/new' className="btn button--primary button-section-header">Add a Project</Link>
          <table className="table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Category</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ongoing</td>
                <td><a href="">Name of Project</a> <a href="">Edit</a></td>
                <td>Agriculture Extension, Research</td>
                <td>Governorate 2, District 1, Governorate 1, District 1</td>
              </tr>
              <tr>
                <td>Ongoing</td>
                <td><a href="">Name of Project</a> <a href="">Edit</a></td>
                <td>Agriculture Extension, Research</td>
                <td>Governorate 2, District 1, Governorate 1, District 1</td>
              </tr>
              <tr>
                <td>Ongoing</td>
                <td><a href="">Name of Project</a> <a href="">Edit</a></td>
                <td>Agriculture Extension, Research</td>
                <td>Governorate 2, District 1, Governorate 1, District 1</td>
              </tr>
              <tr>
                <td>Ongoing</td>
                <td><a href="">Name of Project</a> <a href="">Edit</a></td>
                <td>Agriculture Extension, Research</td>
                <td>Governorate 2, District 1, Governorate 1, District 1</td>
              </tr>
            </tbody>
            {listItems}
          </table>
        </div>
      </div>
    );
  }
}

export default Index;
