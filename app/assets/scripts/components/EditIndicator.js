import React, {PropTypes as T} from 'react';
import IndicatorForm from './IndicatorForm';
import { Link } from 'react-router';

const config = require('../config');
const apiRoot = config.api_root;

class EditIndicator extends React.Component {
  static contextTypes = {
    router: T.object
  }

  constructor (props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount () {
    const component = this;
    const id = component.props.location.pathname
      .replace('/indicators/', '')
      .replace('/edit', '')
    ;

    component.props.auth.request(`${apiRoot}/indicators/${id}`, 'get')
      .then(function (resp) {
        component.setState({
          indicator: resp,
          id: id
        });
      }).fail(function (err, msg) {
        console.error('error', err, msg);
      });
  }

  handleSubmit ({formData}) {
    const component = this;
    return component.props.auth.request(`${apiRoot}/indicators/${component.state.id}`, 'put', {
      data: JSON.stringify(formData)
    }).then(function (resp) {
      if (resp.id) {
        component.context.router.push(`/indicators/${resp.id}`);
      }
    }).fail(function (err, msg) {
      console.error('error', err, msg);
    });
  }

  handleDelete () {
    const component = this;
    return component.props.auth.request(`${apiRoot}/indicators/${component.state.id}`, 'delete')
      .then(function (resp) {
        component.context.router.push('/indicators');
      }).fail(function (err, msg) {
        console.error('error', err, msg);
      });
  }

  render () {
    const component = this;
    if (component.state && component.state.indicator) {
      return <div>
        <IndicatorForm onSubmit={component.handleSubmit} formData={component.state.indicator.data}/>
        <br />
        <button className="btn btn-danger" onClick={component.handleDelete}>Delete</button>
        <br />
        <br />
        <Link className="btn btn-outline-danger" to={`/indicators/${component.state.id}`}>Cancel</Link>
      </div>;
    }
    return <div></div>;
  }
}

export default EditIndicator;
