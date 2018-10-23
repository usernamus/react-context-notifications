import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Notification extends Component {
  constructor(props) {
    super(props);

    const {
      id,
      deleteNotification,
      deleteAfter,
    } = props;

    this.deleteTimeout = setTimeout(() => deleteNotification(id), deleteAfter);
  }

  componentWillUnmount() {
    if (this.deleteTimeout) clearTimeout(this.deleteTimeout);
  }

  render() {
    const {
      id,
      message,
      deleteNotification,
      classNamePrefix,
    } = this.props;

    return (
      <div className={`${classNamePrefix}-item`}>
        <div className={`${classNamePrefix}-item-content`}>
          {message}
        </div>
        <button
          type="button"
          onClick={() => deleteNotification(id)}
        >
          &times;
        </button>
      </div>
    );
  }
}

Notification.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  deleteAfter: PropTypes.number,
  deleteNotification: PropTypes.func.isRequired,
  classNamePrefix: PropTypes.string,
};
Notification.defaultProps = {
  classNamePrefix: 'notification',
  deleteAfter: 2000,
};
