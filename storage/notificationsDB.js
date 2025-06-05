// storage/notificationsDB.js
const notifications = []; // array to store all notifications

export default {
  addNotification(notification) {
    notifications.push(notification);
  },

  updateNotificationStatus(id, status) {
    const notif = notifications.find((n) => n.id === id);
    if (notif) notif.status = status;
  },

  incrementRetries(id) {
    const notif = notifications.find((n) => n.id === id);
    if (notif) notif.retries++;
  },

  getNotificationsByUserId(userId) {
    return notifications.filter((n) => n.userId === userId);
  },
};
