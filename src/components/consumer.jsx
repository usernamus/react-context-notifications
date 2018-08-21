import React from 'react';

import { Consumer } from './context';

const withNotifications = Children => (props => (
  <Consumer>
    {({
      notifications,
      addNotification,
      clearNotifications,
    }) => (
      <Children
        {...props}
        notifications={notifications}
        addNotification={addNotification}
        clearNotifications={clearNotifications}
      />
    )}
  </Consumer>
));

export default withNotifications;
