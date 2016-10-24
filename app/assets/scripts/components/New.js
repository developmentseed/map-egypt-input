/* Add a new Dataset */
import React, {PropTypes as T} from 'react';
import ProjectForm from './ProjectForm';

let config = require('../config');
let api_root = config.api_root;

class New extends React.Component {
  static contextTypes = {
    router: T.object
  }

  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit ({formData}) {
    const component = this;
    return this.props.auth.request(`${api_root}/projects`, 'post', {
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
    return <ProjectForm onSubmit={component.handleSubmit} />
  }
}

export default New;
