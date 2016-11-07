import React, {PropTypes as T} from 'react';
import { Link } from 'react-router';

const config = require('../config');
const apiRoot = config.api_root;

class ProjectList extends React.Component {
  static contextTypes = {
    router: T.object
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
        <ul>
          {listItems}
        </ul>
        <br />
        <Link to="projects/new" className="btn btn-outline-primary">Add Project</Link>
        <br />
        <br />
      </div>
    );
  }
}

export default ProjectList;
