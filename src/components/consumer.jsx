import React from 'react';

import { Consumer } from './context';

const withNotifications = (Children) => ((props) => (
  <Consumer>
    {({
      notifications,
      addNotification,
      clearNotifications,
    }) => {
      const keys = [
        'notifications',
        'addNotification',
        'clearNotifications',
      ];

      if (process.env.NODE_ENV === 'development') {
        const identicalKeys = [];

        keys.forEach((key) => {
          if (props[key]) {
            identicalKeys.push(key);
          }
        });

        if (identicalKeys.length) {
          console.error(`react-context-notification: ${identicalKeys.join(', ')} ${identicalKeys.length > 1 ? 'props' : 'prop'} already used in component`);
        }
      }

      return (
        <Children
          {...props}
          notifications={notifications}
          addNotification={addNotification}
          clearNotifications={clearNotifications}
        />
      );
    }}
  </Consumer>
));

export default withNotifications;
