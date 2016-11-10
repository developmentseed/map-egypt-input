import React from 'react';

import ProjectList from './ProjectList';
import IndicatorList from './IndicatorList';

class Index extends React.Component {

  render () {
    return (
      <div className="wrapper-content">
        <ProjectList auth={this.props.auth} />
        <IndicatorList auth={this.props.auth} />
      </div>
    );
  }
}

export default Index;
