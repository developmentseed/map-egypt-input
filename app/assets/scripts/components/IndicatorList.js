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
    let listItems = list.map((item) => <li key={item.id}><Link to={`/indicators/${item.id}`}>{item.name}</Link></li>);

    return (
      <div>
        <ul>
          {listItems}
        </ul>
        <br />
        <Link to="indicators/new" className="btn btn-outline-primary">Add Indicator</Link>
        <br />
        <br />
      </div>
    );
  }
}

export default IndicatorList;
