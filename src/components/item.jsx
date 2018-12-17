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
      position,
      deleteNotification,
      defaultStyles,
      classNamePrefix,
    } = this.props;

    return (
      <div
        className={`${classNamePrefix}-item`}
        style={defaultStyles ? {
          position: 'relative',
          display: 'flex',
          alignItem: 'center',
          alignContent: 'center',
          margin: '10px',
          background: '#fff',
          borderRadius: '4px',
          color: '#000',
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)',
          left: (position === 'top center' || position === 'bottom center') ? '-50%' : null,
        } : undefined}
      >
        <div
          className={`${classNamePrefix}-item-content`}
          style={defaultStyles ? {
            width: '150px',
            padding: '10px 15px',
            color: '#4a4a4a',
            fontSize: '16px',
          } : undefined}
        >
          {message}
        </div>
        <button
          type="button"
          style={defaultStyles ? {
            display: 'block',
            width: '50px',
            border: 'none',
            padding: 0,
            margin: 0,
            borderLeft: '1px solid #eee',
            background: 'none',
            cursor: 'pointer',
            fontSize: '20px',
          } : undefined}
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
  position: PropTypes.string,
  deleteAfter: PropTypes.number,
  deleteNotification: PropTypes.func.isRequired,
  defaultStyles: PropTypes.bool,
  classNamePrefix: PropTypes.string,
};
Notification.defaultProps = {
  position: null,
  classNamePrefix: 'notification',
  defaultStyles: false,
  deleteAfter: 2000,
};
