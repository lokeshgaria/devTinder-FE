import { store } from "../utils/redux/AppStore/store";
import { addNotification, removeNotification } from '../utils/redux/feature/notificationSlice';

/**
 * Show a notification
 * @param {Object} options - Notification options
 * @param {string} options.type - 'success', 'error', 'info', 'warning'
 * @param {string} options.message - Notification message
 * @param {number} options.duration - Auto dismiss duration in ms (default: 5000)
 * @param {string} options.position - 'top-right', 'top-left', 'bottom-right', 'bottom-left'
 * @returns {string} Notification ID
 */
export const showNotification = (options) => {
  const defaultOptions = {
    type: 'info',
    duration: 5000,
    position: 'top-right',
    message: '',
  };

  const notification = { ...defaultOptions, ...options };
  store.dispatch(addNotification(notification));

  // Auto remove notification after duration
  if (notification.duration > 0) {
    setTimeout(() => {
      store.dispatch(removeNotification(notification.id));
    }, notification.duration);
  }

  return notification.id;
};

/**
 * Show success notification
 * @param {string} message - Success message
 * @param {Object} options - Additional options
 * @returns {string} Notification ID
 */
export const showSuccess = (message, options = {}) => {
  return showNotification({
    type: 'success',
    message,
    ...options,
  });
};

/**
 * Show error notification
 * @param {string} message - Error message
 * @param {Object} options - Additional options
 * @returns {string} Notification ID
 */
export const showError = (message, options = {}) => {
  return showNotification({
    type: 'error',
    message,
    ...options,
  });
};

/**
 * Show info notification
 * @param {string} message - Info message
 * @param {Object} options - Additional options
 * @returns {string} Notification ID
 */
export const showInfo = (message, options = {}) => {
  return showNotification({
    type: 'info',
    message,
    ...options,
  });
};

/**
 * Show warning notification
 * @param {string} message - Warning message
 * @param {Object} options - Additional options
 * @returns {string} Notification ID
 */
export const showWarning = (message, options = {}) => {
  return showNotification({
    type: 'warning',
    message,
    ...options,
  });
};

/**
 * Manually dismiss a notification
 * @param {string} id - Notification ID
 */
export const dismissNotification = (id) => {
  store.dispatch(removeNotification(id));
};

/**
 * Clear all notifications
 */
export const clearAllNotifications = () => {
  store.dispatch(clearAllNotifications());
};