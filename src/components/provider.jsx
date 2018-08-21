import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import update from 'immutability-helper';
import nanoid from 'nanoid';

import { Provider } from './context';
import Notification from './item';

export default class NotificationsProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
    };

    this.el = document.createElement('div');
    this.el.setAttribute('class', 'notifications');

    this.addNotification = this.addNotification.bind(this);
    this.deleteNotification = this.deleteNotification.bind(this);
    this.clearNotifications = this.clearNotifications.bind(this);
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  addNotification(notification) {
    const { notifications } = this.state;

    this.setState({
      notifications: update(notifications, {
        $push: [{
          id: nanoid(),
          message: notification,
        }],
      }),
    });
  }

  deleteNotification(notificationId) {
    const { notifications } = this.state;
    const index = notifications.findIndex(notification => notification.id === notificationId);

    if (index > -1) {
      this.setState({
        notifications: update(notifications, { $splice: [[notifications[index], 1]] }),
      });
    }
  }

  clearNotifications() {
    this.setState({
      notifications: [],
    });
  }

  render() {
    const { children } = this.props;
    const { notifications } = this.state;
    const value = {
      notifications,
      addNotification: this.addNotification,
      clearNotifications: this.clearNotifications,
    };

    const notificationsPortal = notifications.map(notification => (
      <Notification
        key={notification.id}
        notificationId={notification.id}
        notificationMessage={notification.message}
        deleteNotification={this.deleteNotification}
      />
    ));

    return (
      <Provider value={value}>
        {children}
        {createPortal(notificationsPortal, this.el)}
      </Provider>
    );
  }
}

NotificationsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array,
  ]).isRequired,
};
