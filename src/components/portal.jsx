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

  render() {
    const { notifications, notificationItem } = this.props;

    if (!notificationItem) return null;

    const sortedNotifications = {
      leftTop: notifications.filter(el => el.position === 'left top'),
      centerTop: notifications.filter(el => el.position === 'center top'),
      rightTop: notifications.filter(el => el.position === 'right top'),
      leftBottom: notifications.filter(el => el.position === 'left bottom'),
      centerBottom: notifications.filter(el => !el.position || el.position === 'center bottom'),
      rightBottom: notifications.filter(el => el.position === 'right bottom'),
    };

    return (
      <div className="portal">
        <div className="left-top" style={{ position: 'fixed', left: 0, top: 0 }}>
          {sortedNotifications && sortedNotifications.leftTop.map(this.renderNotification)}
        </div>
        <div className="center-top" style={{ position: 'fixed', left: '50%', top: 0 }}>
          {sortedNotifications && sortedNotifications.centerTop.map(this.renderNotification)}
        </div>
        <div className="right-top" style={{ position: 'fixed', right: 0, top: 0 }}>
          {sortedNotifications && sortedNotifications.rightTop.map(this.renderNotification)}
        </div>
        <div className="left-bottom" style={{ position: 'fixed', left: 0, bottom: 0 }}>
          {sortedNotifications && sortedNotifications.leftBottom.map(this.renderNotification)}
        </div>
        <div className="center-bottom" style={{ position: 'fixed', left: '50%', bottom: 0 }}>
          {sortedNotifications && sortedNotifications.centerBottom.map(this.renderNotification)}
        </div>
        <div className="right-bottom" style={{ position: 'fixed', right: 0, bottom: 0 }}>
          {sortedNotifications && sortedNotifications.rightBottom.map(this.renderNotification)}
        </div>
      </div>
    );
  }
}

Portal.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  notificationItem: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]),
};
Portal.defaultProps = {
  notificationItem: null,
};
