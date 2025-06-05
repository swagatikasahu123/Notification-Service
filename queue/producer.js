// queue/producer.js
import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = "notifications";

let channel; // will hold the channel instance

// 1) Create (or reuse) a channel
async function getChannel() {
  if (channel) return channel;
  const connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  return channel;
}

// 2) Enqueue a message (notification)
export async function enqueueNotification(notification) {
  try {
    const ch = await getChannel();
    ch.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(notification)), {
      persistent: true,
    });
    console.log(`Enqueued notification ${notification.id}`);
  } catch (err) {
    console.error("enqueueNotification error:", err);
    throw err;
  }
}
