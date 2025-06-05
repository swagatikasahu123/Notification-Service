// routes/notificationRoutes.js
import express from "express";
import {
  sendNotification,
  getUserNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Send a notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - type
 *               - content
 *             properties:
 *               userId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [email, sms, in_app]
 *               content:
 *                 type: string
 *               email:
 *                 type: string
 *                 description: Required if type is 'email'
 *               phone:
 *                 type: string
 *                 description: Required if type is 'sms'
 *     responses:
 *       200:
 *         description: Notification queued successfully
 *       400:
 *         description: Missing/invalid fields
 *       500:
 *         description: Server error
 */
router.post("/notifications", sendNotification);

/**
 * @swagger
 * /api/users/{id}/notifications:
 *   get:
 *     summary: Get all notifications for a specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of notifications
 *       500:
 *         description: Server error
 */
router.get("/users/:id/notifications", getUserNotifications);

export default router;
