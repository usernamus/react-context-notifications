import React from 'react';

import { Consumer } from './context';
import { providedPropKeys } from './provider';

const withNotifications = Children => (props => (
  <Consumer>
    {({
      notifications,
      addNotification,
      clearNotifications,
    }) => {
      if (process.env.NODE_ENV === 'development') {
        const identicalKeys = providedPropKeys.filter(key => props[key]);

        if (identicalKeys.length) {
          // eslint-disable-next-line no-console
          console.warn(`react-context-notification: '${identicalKeys.join(', ')}' ${identicalKeys.length > 1 ? 'props' : 'prop'} already used in component`);
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
