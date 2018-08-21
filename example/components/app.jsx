import React, { Component } from 'react';
import { render } from 'react-dom';

import { NotificationsProvider } from '../../src';
import Consumer from './consumer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <NotificationsProvider>
        <Consumer />
      </NotificationsProvider>
    );
  }
}

render(<App />, document.getElementById('app'));
