/* Add a new Dataset */
import React from 'react';
import ProjectForm from './ProjectForm';
import { browserHistory } from 'react-router'

let config = require('../config');
let api_root = config.api_root;

class New extends React.Component {
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
        component.props.router.push(`/projects/${resp.id}`);
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
