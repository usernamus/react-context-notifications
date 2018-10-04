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

    if (deleteAfter) {
      this.deleteTimeout = setTimeout(() => deleteNotification(notificationId), deleteAfter);
    }
  }

  componentWillUnmount() {
    if (this.deleteTimeout) clearTimeout(this.deleteTimeout);
  }

  render() {
    const {
      notificationId,
      notificationMessage,
      deleteNotification,
      classNamePrefix,
    } = this.props;

    return (
      <div className={`${classNamePrefix}-item`}>
        <div className={`${classNamePrefix}-item-content`}>
          {notificationMessage}
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
  notificationMessage: PropTypes.oneOfType([
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
