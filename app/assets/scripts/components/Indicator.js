import React from 'react';
import { Link } from 'react-router';
import {schema} from './IndicatorForm.js';

const config = require('../config');
const apiRoot = config.api_root;
const ordering = [
  'name',
  'description'
];

const sortOrder = {};
ordering.forEach((item, index) => {
  sortOrder[item] = index;
});

class Indicator extends React.Component {
  componentWillMount () {
    const component = this;
    const id = component.props.location.pathname.replace('/indicators/', '');

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

  render () {
    const component = this;
    if (component.state && component.state.indicator) {
      const indicator = component.state.indicator.data;
      const keys = schema.properties;
      const rows = Object.keys(indicator).sort(function (a, b) {
        if (sortOrder[a] < sortOrder[b]) { return -1; }
        if (sortOrder[a] > sortOrder[b]) { return 1; }
        return 0;
      }).map(function (key) {
        if (keys[key].type === 'string') {
          return <li key={key}><label>{keys[key].title}</label>{ indicator[key] }</li>;
        // } else if (key === 'number_served') {
        //   return <li key={key}><label>{keys[key].title}</label>{ project[key].number_served + ' ' + project[key].number_served_unit}</li>;
        // } else if (key === 'location') {
        //   const locations = project[key].map((location) => <li>{location.district + ', ' + location.governorate}</li>);
        //   return <li key={key}><label>{keys[key].title}</label><ul>{locations}</ul></li>;
        // } else if (key === 'sds_indicator' || key === 'sdg_indicator' || key === 'category') {
        //   const indicators = project[key].map((item) => <li>{item}</li>);
        //   return <li key={key}><label>{keys[key].title}</label><ul>{indicators}</ul></li>;
        // } else if (key === 'funds' && project[key].length > 0) {
        //   const funds = project[key].map((fund) => <li>{fund.donor_name + ': ' + fund.type + ' $' + fund.amount + ' ' + fund.date}</li>);
        //   return <li key={key}><label>{keys[key].title}</label><ul>{funds}</ul></li>;
        // } else if (key === 'kmi' && project[key].length > 0) {
        //   const kmis = project[key].map((kmi) => <li>{kmi.activity}<p>{kmi.description}</p><p>{kmi.kpi}</p><p>{kmi.date}</p><p>{kmi.status}</p></li>);
        //   return <li key={key}><label>{keys[key].title}</label><ul>{kmis}</ul></li>;
        }
      });

      return (
        <div className="indicator-display">
          <ul>
            { rows }
          </ul>
          <Link className="btn btn-outline-primary" to={`/indicators/${component.state.id}/edit`}>Edit</Link>
          <br />
          <br />
          <Link className="btn btn-outline-primary" to='/indicators'>All Indicators</Link>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Indicator;
