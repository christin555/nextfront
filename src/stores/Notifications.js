import {store} from 'react-notifications-component';

const alertQueue = {};
const DELAY = 3000;
const isServer = typeof window === 'undefined';

export const alert = ({type, title = ' ', message = ' '}) => {
  if (alertQueue[title] === type || isServer) {
    return;
  }

  alertQueue[title] = type;

  setTimeout(() => delete alertQueue[title], DELAY);

  const opt = {
    container: 'top-right',
    dismiss: {
      duration: DELAY,
      onScreen: false
    },
    showIcon: true,
    message,
    title
  };

  switch (type) {
    case 'info':
      store.addNotification({type, ...opt});
      break;
    case 'success':
      store.addNotification({type, ...opt});
      break;
    case 'warning':
      store.addNotification({type, ...opt});
      break;
    case 'error':
      store.addNotification({type: 'danger', ...opt});
  }
};
