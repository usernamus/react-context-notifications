import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Notification extends Component {
  constructor(props) {
    super(props);

    const {
      notificationId,
      deleteNotification,
      deleteAfter,
    } = props;

    this.deleteTimeout = setTimeout(() => deleteNotification(notificationId), deleteAfter);
  }

  componentWillUnmount() {
    if (this.deleteTimeout) clearTimeout(this.deleteTimeout);
  }

  render() {
    const {
      notificationId,
      notificationTitle,
      message,
      deleteNotification,
      classNamePrefix,
    } = this.props;

    return (
      <div className="notification-item">
        {notificationTitle && notificationTitle.length > 0 && (
          <div className="notification-item-title">
            {notificationTitle}
          </div>
        )}
        <div className={`${classNamePrefix}-item-content`}>
          {message}
        </div>
        <button
          type="button"
          onClick={() => deleteNotification(notificationId)}
        >
          &times;
        </button>
      </div>
    );
  }
}

Notification.propTypes = {
  notificationId: PropTypes.string.isRequired,
  notificationTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  deleteNotification: PropTypes.func.isRequired,
  classNamePrefix: PropTypes.string,
  deleteAfter: PropTypes.number,
};
Notification.defaultProps = {
  classNamePrefix: 'notification',
  deleteAfter: 2000,
};
