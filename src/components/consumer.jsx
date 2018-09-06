import React from 'react';

import { Consumer } from './context';

const withNotifications = Children => (props => (
  <Consumer>
    {({
      notifications,
      addNotification,
      clearNotifications,
    }) => {
      const keys = [
        ...Object.keys(props),
        'notifications',
        'addNotification',
        'clearNotifications',
      ].sort();

      const identicalKeys = [];

      keys.forEach((key, i) => {
        if (key === keys[i + 1] && !identicalKeys.includes(key)) {
          identicalKeys.push(key);
        }
      });

      if (identicalKeys.length) {
        // eslint-disable-next-line no-console
        console.warn(`react-context-notification: ${identicalKeys.join(', ')} ${identicalKeys.length > 1 ? 'props' : 'prop'} already used in component`);
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
