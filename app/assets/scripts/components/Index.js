import React from 'react';
import {Link} from 'react-router';

const config = require('../config');
const api_root = config.api_root;

class Index extends React.Component {
  componentWillMount () {
    const component = this;
    component.props.auth.request(`${api_root}/projects`, 'get')
      .then(function (resp) {
        component.setState({
          list: resp
        });
      });
  }
  
  render () {
    if (!this.state) {
      return (<div></div>);
    }
    const {list} = this.state;
    let listItems = list.map((item) => <li key={item.id}><Link to={`/projects/${item.id}`}>{item.name}</Link></li>);

    return (
      <div>
        <ul>
          {listItems}
        </ul>
        <Link to="projects/new">Add data</Link>
      </div>
    );
  }
}

export default Index;
