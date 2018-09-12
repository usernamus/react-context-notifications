import React, { Component, Fragment } from 'react';

import { withNotifications } from '../../src';

class Children extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <header>
          <div className="container">
            <h1>React context notifications</h1>
            <p>Extremly simple and flexible notifications based on React Context</p>
          </div>
        </header>
        <section>
          <div className="container">
            <h2>Getting started</h2>
            <p>Start by installing react-context-notifications package:</p>
            <code>
              <p>npm i react-context-notifications --save</p>
              <p>yarn add react-context-notifications</p>
            </code>
            <p>Import notification&apos;s provider and wrap your application in it.</p>
            <p>
              The provider is responsible to pass the data and functions
              by props down to all a components that will use HOC.
            </p>
            <p>
              You must to import HOC and wrap your component
              in which you want to manage notifications.
            </p>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default withNotifications(Children);
