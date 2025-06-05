// queue/consumer.js
import amqp from "amqplib";
import dotenv from "dotenv";
import notificationsDB from "../storage/notificationsDB.js";

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = "notifications";

// Create a RabbitMQ channel and start consuming
async function consume() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  console.log(" [*] Waiting for messages in queue:", QUEUE_NAME);

  channel.consume(
    QUEUE_NAME,
    async (msg) => {
      if (msg !== null) {
        try {
          const notification = JSON.parse(msg.content.toString());

          console.log(`Processing notification ${notification.id} (retry #${notification.retries})`);

          // 1) Simulate sending based on type
          if (notification.type === "email") {
            if (!notification.email) throw new Error("Missing email address");
            console.log(`→ [Email] To: ${notification.email} | Content: "${notification.content}"`);
          } else if (notification.type === "sms") {
            if (!notification.phone) throw new Error("Missing phone number");
            console.log(`→ [SMS] To: ${notification.phone} | Content: "${notification.content}"`);
          } else {
            console.log(`→ [In-App] For user ${notification.userId}: "${notification.content}"`);
          }

          // 2) Simulate random failure (e.g., 25% chance of failure)
          if (Math.random() < 0.25) {
            throw new Error("Simulated random failure in sending");
          }

          // 3) If successful: update status to "sent" in our in-memory DB
          notificationsDB.updateNotificationStatus(notification.id, "sent");
          console.log(`✅ Notification ${notification.id} sent successfully`);

          channel.ack(msg);
        } catch (err) {
          console.error(`⚠️ Error processing ${msg.fields.deliveryTag}:`, err.message);

          // 4) Retry logic
          const notifObj = JSON.parse(msg.content.toString());
          notifObj.retries = notifObj.retries + 1;

          if (notifObj.retries <= 3) {
            console.log(`↩️ Retrying notification ${notifObj.id} (attempt ${notifObj.retries})`);
            notificationsDB.incrementRetries(notifObj.id);

            // Re‑enqueue with updated retry count
            channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(notifObj)), {
              persistent: true,
            });
          } else {
            console.log(`❌ Notification ${notifObj.id} failed after 3 retries`);
            notificationsDB.updateNotificationStatus(notifObj.id, "failed");
          }

          channel.ack(msg);
        }
      }
    },
    { noAck: false }
  );
}

consume().catch((err) => {
  console.error("Consumer error:", err);
});
