import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Notification extends Component {
  constructor(props) {
    super(props);

    const {
      deleteNotification,
      deleteAfter,
    } = props;

    this.deleteTimeout = setTimeout(() => deleteNotification(), deleteAfter);
  }

  componentWillUnmount() {
    if (this.deleteTimeout) clearTimeout(this.deleteTimeout);
  }

  render() {
    const {
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
          onClick={() => deleteNotification()}
        >
          &times;
        </button>
      </div>
    );
  }
}

Notification.propTypes = {
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
