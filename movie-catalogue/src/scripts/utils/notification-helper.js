/* eslint-disable no-unused-vars */
import { async } from 'regenerator-runtime';

const NotificationHelper = {
  sendNotification({ title, options }) {
    if (!this._checkAvaibility()) {
      console.log('Notification not supported in the browser');
      return;
    }

    if (!this._checkPermission()) {
      console.log('User did not yet grented permission');
      this._requestPermission();
      return;
    }

    this._showNotification({ title, options });
  },

  _checkAvaibility() {
    return 'Notification' in window;
  },

  _checkPermission() {
    return Notification.permission === 'granted';
  },

  async _requestPermission() {
    const status = await Notification.requestPermission();

    if (status === 'denied') {
      console.log('Notification Denied');
    }

    if (status === 'default') {
      console.log('Permission closed');
    }
  },

  async _showNotification({ title, options }) {
    const ServiceWorkerRegistration = await navigator.serviceWorker.ready;
    ServiceWorkerRegistration.showNotification(title, options);
  },
};

export default NotificationHelper;
