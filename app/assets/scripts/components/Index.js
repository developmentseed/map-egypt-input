import React from 'react';
import {Link} from 'react-router';

class Index extends React.Component {
  render () {
    return (
      <div>
        <div>Successful login!</div> 
        <Link to="new">Add data</Link>
      </div>
    );
  }
}

export default Index;
