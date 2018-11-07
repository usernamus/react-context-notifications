import React, { Component } from 'react';
import { render } from 'react-dom';

import { NotificationsProvider } from '../../src';

import Children from './children';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const settings = {
      className: 'notifications',
      classNamePrefix: 'notification',
      defaultStyles: true,
    };

    return (
      <NotificationsProvider settings={settings}>
        <Children />
      </NotificationsProvider>
    );
  }
}

render(<App />, document.getElementById('app'));
