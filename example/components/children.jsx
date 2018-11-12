import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import { withNotifications } from '../../src';

class Children extends Component {
  constructor(props) {
    super(props);

    this.positionOptions = [
      { value: 'top left', label: 'Top left' },
      { value: 'top center', label: 'Top center' },
      { value: 'top right', label: 'Top right' },
      { value: 'bottom left', label: 'Bottom left' },
      { value: 'bottom center', label: 'Bottom center' },
      { value: 'bottom right', label: 'Bottom right' },
    ];

    this.state = {
      message: 'Hello',
      deleteAfter: 4000,
      position: this.positionOptions[1],
    };
  }

  onTextfieldChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  onSelectChange = (value) => {
    this.setState({
      position: value,
    });
  }

  onClick = () => {
    const { addNotification } = this.props;
    const { message, deleteAfter, position } = this.state;

    addNotification({
      message,
      position: position.value,
      deleteAfter: deleteAfter / 1,
    });
  }

  render() {
    const { message, deleteAfter, position } = this.state;

    return (
      <div className="example">
        <div className="example-inner">
          <div className="example-title">
            <h1>
              React context notifications
              <a
                href="https://github.com/usernamus/react-context-notifications"
                target="_blank"
                rel="noopener noreferrer"
              >
                v0.2.0
              </a>
            </h1>
            <p>Extremely simple and flexible notifications based on React Context</p>
          </div>
          <form className="example-form">
            <div className="row">
              <div className="col col-1-4">
                <label className="label" htmlFor="notification-text">
                  Message
                </label>
                <input
                  id="notification-text"
                  className="textfield"
                  placeholder="Hello"
                  type="text"
                  name="message"
                  value={message}
                  onChange={this.onTextfieldChange}
                />
              </div>
              <div className="col col-1-4">
                <label className="label" htmlFor="notification-area">
                  Position
                </label>
                <Select
                  id="notification-area"
                  options={this.positionOptions}
                  value={position}
                  onChange={this.onSelectChange}
                />
              </div>
              <div className="col col-1-4">
                <label className="label" htmlFor="notification-delete-after">
                  Delete after
                  <span>(Ms)</span>
                </label>
                <input
                  id="notification-delete-after"
                  className="textfield"
                  placeholder="4000"
                  type="text"
                  name="deleteAfter"
                  value={deleteAfter}
                  onChange={this.onTextfieldChange}
                />
              </div>
              <div className="col col-1-4">
                <button
                  className="button"
                  type="button"
                  onClick={this.onClick}
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Children.propTypes = {
  addNotification: PropTypes.func.isRequired,
};

export default withNotifications(Children);
