import React, {PropTypes as T} from 'react';
import { Link } from 'react-router';

const config = require('../config');
const apiRoot = config.api_root;

class IndicatorList extends React.Component {
  static contextTypes = {
    router: T.object
  }

  componentWillMount () {
    const component = this;
    component.props.auth.request(`${apiRoot}/indicators`, 'get')
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
          <td><Link to={`/indicators/${item.id}`}>{item.name}</Link></td>
          <td><Link to={`/indicators/${item.id}`}>{item.name}</Link></td>
          <td><Link to={`/indicators/${item.id}`}>{item.name}</Link></td>
          <td><Link to={`/indicators/${item.id}`}>{item.name}</Link></td>
        </tr>
      );
    }).filter((item, i) => {
      // filter out items if we have a limit
      return component.props.limit ? i < component.props.limit : true;
    });

    return (
      <div className="section">
        <h2 className="header-page-main">Recently Added Indicators</h2>
        <Link to='indicators/new' className="btn button--primary button-section-header button--small">Add an Indicator</Link>
        <Link to='indicators' className="btn button--primary button-section-header button--small">View All</Link>
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
            {listItems}
          </tbody>
        </table>
      </div>
    );
  }
}

export default IndicatorList;
