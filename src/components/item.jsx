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
      notificationMessage,
      deleteNotification,
    } = this.props;

    return (
      <div className="notification">
        <div className="content">
          {notificationMessage}
        </div>
        <button
          type="button"
          onClick={() => deleteNotification(notificationId)}
        >
          Close
        </button>
      </div>
    );
  }
}

Notification.propTypes = {
  notificationId: PropTypes.string.isRequired,
  notificationMessage: PropTypes.string.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  deleteAfter: PropTypes.number,
};
Notification.defaultProps = {
  deleteAfter: 2000,
};
