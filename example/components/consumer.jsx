import React, { Component } from 'react';

import { withNotifications } from '../../src';

class Consumer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>Consumer</div>
    );
  }
}

export default withNotifications(Consumer);
