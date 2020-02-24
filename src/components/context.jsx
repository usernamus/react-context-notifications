import { createContext } from 'react';

const NotificationContext = createContext({ notifications: null });

export const { Provider, Consumer } = NotificationContext;

export default NotificationContext;
