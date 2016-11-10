import React from 'react';

import ProjectList from './ProjectList';
import IndicatorList from './IndicatorList';

class Index extends React.Component {

  render () {
    return (
      <div>
        <ProjectList auth={this.props.auth} limit={5} />
        <IndicatorList auth={this.props.auth} limit={5} />
      </div>
    );
  }
}

export default Index;
