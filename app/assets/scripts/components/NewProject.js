/* Add a new Dataset */
import React, {PropTypes as T} from 'react';
import ProjectForm from './ProjectForm';
import {Link} from 'react-router';

let config = require('../config');
let apiRoot = config.api_root;

class NewProject extends React.Component {
  static contextTypes = {
    router: T.object
  }

  constructor (props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit ({formData}) {
    const component = this;
    return this.props.auth.request(`${apiRoot}/projects`, 'post', {
      data: JSON.stringify(formData)
    }).then(function (resp) {
      if (resp.id) {
        component.context.router.push(`/projects/${resp.id}`);
      }
    }).fail(function (err, msg) {
      console.error('error', err, msg);
    });
  }

  render () {
    const component = this;
    return (
      <div>
       <ProjectForm onSubmit={component.handleSubmit} />
       <br />
       <Link className="btn btn-outline-danger" to="/">Cancel</Link>
     </div>
    );
  }
}

export default NewProject;
