import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Portal extends Component {
  constructor(props) {
    super(props);

    this.renderNotification = this.renderNotification.bind(this);
  }

  renderNotification(notification) {
    const { notificationItem: Notification } = this.props;

    return <Notification key={notification.id} {...notification} />;
  }

  renderAreas(sortedNotifications) {
    const { settings } = this.props;

    if (sortedNotifications) {
      const { defaultStyles } = settings || {};

      return Object.keys(sortedNotifications).map((key) => {
        const { notifications, styles } = sortedNotifications[key];

        return (
          <div key={key} className={key} style={defaultStyles ? styles : null}>
            {notifications && notifications.map(this.renderNotification)}
          </div>
        );
      });
    }

    return null;
  }

  render() {
    const { notifications, notificationItem } = this.props;

    if (!notificationItem) return null;

    const sortedNotifications = {
      'top-left': {
        notifications: notifications.filter(el => el.position === 'top left'),
        styles: { position: 'fixed', left: 0, top: 0 },
      },
      'top-center': {
        notifications: notifications.filter(el => el.position === 'top center'),
        styles: { position: 'fixed', left: '50%', top: 0 },
      },
      'top-right': {
        notifications: notifications.filter(el => el.position === 'top right'),
        styles: { position: 'fixed', right: 0, top: 0 },
      },
      'bottom-left': {
        notifications: notifications.filter(el => el.position === 'bottom left'),
        styles: { position: 'fixed', left: 0, bottom: 0 },
      },
      'bottom-center': {
        notifications: notifications.filter(el => !el.position || el.position === 'bottom center'),
        styles: { position: 'fixed', left: '50%', bottom: 0 },
      },
      'bottom-right': {
        notifications: notifications.filter(el => el.position === 'bottom right'),
        styles: { position: 'fixed', right: 0, bottom: 0 },
      },
    };

    return this.renderAreas(sortedNotifications);
  }
}

Portal.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  notificationItem: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]),
  settings: PropTypes.shape({
    className: PropTypes.string,
    classNamePrefix: PropTypes.string,
    defaultStyles: PropTypes.bool,
  }),
};
Portal.defaultProps = {
  notificationItem: null,
  settings: null,
};
