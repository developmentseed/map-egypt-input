import React from 'react';
import { Link } from 'react-router';

const config = require('../config');
const apiRoot = config.api_root;

class Project extends React.Component {
  componentWillMount () {
    const component = this;
    const id = component.props.location.pathname.replace('/projects/', '');

    component.props.auth.request(`${apiRoot}/projects/${id}`, 'get')
      .then(function (resp) {
        component.setState({
          project: resp,
          id: id
        });
      }).fail(function (err, msg) {
        console.error('error', err, msg);
      });
  }

  render () {
    const component = this;
    if (component.state && component.state.project) {
      const project = component.state.project.data;
      const rows = Object.keys(project).map(function (key) {
        return <tr key={key}><td>{key}</td><td>{ JSON.stringify(project[key]) }</td></tr>;
      });

      return (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
          </table>
          <Link className="btn btn-outline-primary" to={`/projects/${component.state.id}/edit`}>Edit</Link>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Project;
