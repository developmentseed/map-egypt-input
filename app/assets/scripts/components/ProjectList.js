import React, {PropTypes as T} from 'react';
import { Link } from 'react-router';
import moment from 'moment';

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

  render () {
    const component = this;
    if (!component.state) {
      return (<div></div>);
    }
    const {list} = component.state;
    const listItems = list.map((item) => {
      return (
        <tr key={item.id}>
          <td><Link to={`/projects/${item.id}`}>{item.name}</Link></td>
          <td>{item.categories && item.categories.join(', ')}</td>
          <td>{item.location && item.location.map(l => `${l.governorate} - ${l.district}`).join(', ')}</td>
          <td>{moment(item.updated_at).format('YYYY-MM-DD')}</td>
          <td>{moment(item.created_at).format('YYYY-MM-DD')}</td>
        </tr>
      );
    }).filter((item, i) => {
      // filter out items if we have a limit
      return component.props.limit ? i < component.props.limit : true;
    });

    return (
      <div className="section">
        <h2 className="header-page-main">Recently Added Projects</h2>
        <Link to='projects/new' className="btn button--primary button-section-header button--small">Add a Project</Link>
        <Link to='projects' className="btn button--primary button-section-header button--small">View All</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Updated</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProjectList;
