import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import nanoid from 'nanoid';

import { Provider } from './context';
import Notification from './item';

const providedPropKeys = [
  'notifications',
  'addNotification',
  'clearNotifications',
];

class NotificationsProvider extends Component {
  constructor(props) {
    super(props);

    const { className } = this.props;

    this.state = {
      notifications: [],
    };

    this.el = document.createElement('div');
    this.el.setAttribute('class', className);

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
    if (notification && typeof notification === 'object') {
      const { notifications } = this.state;
      const {
        message,
        deleteAfter,
        onNotificationDelete,
      } = notification;

      this.setState({
        notifications: [...notifications, {
          id: nanoid(),
          message,
          deleteAfter,
          onNotificationDelete: onNotificationDelete && typeof onNotificationDelete === 'function' ? onNotificationDelete : null,
        }],
      });
    } else {
      // eslint-disable-next-line no-console
      console.warn('react-context-notification: You tried to add a notification with incorrect function parameters');
    }
  }

  deleteNotification(notificationId) {
    const { notifications } = this.state;

    this.setState({
      notifications: notifications.filter(notification => notification.id !== notificationId),
    });
  }

  clearNotifications() {
    this.setState({
      notifications: [],
    });
  }

  render() {
    const { children, classNamePrefix } = this.props;
    const { notifications } = this.state;
    const value = {
      notifications,
      addNotification: this.addNotification,
      clearNotifications: this.clearNotifications,
    };
    const notificationsPortal = notifications.map(({
      id,
      message,
      deleteAfter,
    }) => (
      <Notification
        key={id}
        classNamePrefix={classNamePrefix}
        notificationId={id}
        notificationMessage={message}
        deleteAfter={deleteAfter}
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
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
};

NotificationsProvider.defaultProps = {
  className: 'notifications',
  classNamePrefix: 'notifications',
};

export {
  NotificationsProvider as default,
  providedPropKeys,
};
