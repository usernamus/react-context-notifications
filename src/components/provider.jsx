import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import nanoid from 'nanoid';

import { Provider } from './context';
import Notification from './item';
import Portal from './portal';

const NotificationsProvider = ({
  children,
  settings,
}) => {
  const element = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const {
    className,
    component: CustomNotification,
  } = settings;

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter((notification) => notification.id !== notificationId));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (notification) => {
    if (notification && typeof notification === 'object') {
      const {
        message,
        position,
        deleteAfter,
        onNotificationDelete,
      } = notification;

      setNotifications([...notifications, {
        id: nanoid(),
        message,
        position,
        deleteAfter,
        deleteNotification,
        classNamePrefix: settings.classNamePrefix,
        defaultStyles: settings.defaultStyles,
        onNotificationDelete: typeof onNotificationDelete === 'function' ? onNotificationDelete : null,
      }]);
    } else {
      // eslint-disable-next-line no-console
      console.warn('react-context-notification: You tried to add a notification with incorrect function parameters');
    }
  };

  useEffect(() => {
    element.current = document.createElement('div');
    element.current.setAttribute('class', className);

    document.body.appendChild(element.current);

    return () => document.body.removeChild(element.current);
  }, []);

  const value = {
    notifications,
    addNotification,
    clearNotifications,
  };
  const notificationsPortal = (
    <Portal
      notifications={notifications}
      settings={settings}
      notificationItem={CustomNotification || Notification}
    />
  );

  return (
    <Provider value={value}>
      {children}
      {element.current && createPortal(notificationsPortal, element.current)}
    </Provider>
  );
};

NotificationsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array,
  ]).isRequired,
  settings: PropTypes.shape({
    className: PropTypes.string,
    classNamePrefix: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.element,
    ]),
    defaultStyles: PropTypes.bool,
  }),
};

NotificationsProvider.defaultProps = {
  settings: {
    className: 'notifications',
    classNamePrefix: 'notifications',
    component: null,
    defaultStyles: false,
  },
};

export default NotificationsProvider;
