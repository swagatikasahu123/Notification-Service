// controllers/notificationController.js
import { v4 as uuidv4 } from "uuid";
import { enqueueNotification } from "../queue/producer.js";
import notificationsDB from "../storage/notificationsDB.js";

// POST /notifications
export async function sendNotification(req, res) {
  try {
    const { userId, type, content, email, phone } = req.body;

    // 1) Basic validation
    if (!userId || !type || !content) {
      return res.status(400).json({ message: "Missing required fields (userId, type, content)." });
    }
    if (type === "email" && !email) {
      return res.status(400).json({ message: "Email address is required for type 'email'." });
    }
    if (type === "sms" && !phone) {
      return res.status(400).json({ message: "Phone number is required for type 'sms'." });
    }

    // 2) Create notification object
    const notification = {
      id: uuidv4(),
      userId,
      type,
      content,
      email: email || null,
      phone: phone || null,
      status: "pending",
      retries: 0,
      createdAt: new Date().toISOString(),
    };

    // 3) Enqueue into RabbitMQ
    await enqueueNotification(notification);

    // 4) Store in memory with status "pending"
    notificationsDB.addNotification(notification);

    return res.json({
      message: "Notification queued successfully.",
      notificationId: notification.id,
    });
  } catch (err) {
    console.error("sendNotification error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
}

// GET /users/:id/notifications
export function getUserNotifications(req, res) {
  try {
    const userId = req.params.id;
    const userNotifications = notificationsDB.getNotificationsByUserId(userId);
    return res.json(userNotifications);
  } catch (err) {
    console.error("getUserNotifications error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
}
