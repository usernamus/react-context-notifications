import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';

import { withNotifications } from '../../src';

class Children extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { addNotification } = this.props;
    const notification = {
      message: 'Hello!',
      deleteAfter: 4000,
      position: 'top right',
    };

    return (
      <Fragment>
        <header>
          <div className="container">
            <h1>React context notifications</h1>
            <p>Extremely simple and flexible notifications based on React Context</p>
            <button type="button" onClick={() => addNotification(notification)}>
              Create notification
            </button>
          </div>
        </header>
        <section>
          <div className="container">
            <h2>Getting started</h2>
            <p>Start by installing react-context-notifications package:</p>
            <Highlight className="javascript">
              {`npm i react-context-notifications --save
// or
yarn add react-context-notifications`}
            </Highlight>
            <p>Import notification&apos;s provider and wrap your application in it.</p>
            <p>
              The provider is responsible to pass the data and functions
              by props down to all components that will use HOC.
            </p>
            <Highlight className="javascript">
              {`import React from 'react';
import { render } from 'react-dom';
import { NotificationsProvider } from 'react-context-notifications';

const App = () => (
  <NotificationsProvider>
    <Routes />
  </NotificationsProvider>
);

render(<App />, document.getElementById('app'));`}
            </Highlight>
            <p>
              To manage notifications you need to import HOC and wrap your component.
              Component gets list of notifications and functions to manage them.
            </p>
            <Highlight className="javascript">
              {`import React from 'react';
import { withNotifications } from 'react-context-notifications';

const Children = ({ addNotification }) => {
  const notification = {
    message: 'Hello!',
    deleteAfter: 4000,
  };

  return (
    <button onClick={() => addNotification(notification)}>
      Add notification
    </button>
  );
};

export default withNotifications(Children)`}
            </Highlight>
          </div>
        </section>
      </Fragment>
    );
  }
}

Children.propTypes = {
  addNotification: PropTypes.func.isRequired,
};

export default withNotifications(Children);
