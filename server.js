import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import notificationRoutes from "./routes/notificationRoutes.js";

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Notification Service API",
      version: "1.0.0",
      description: "API docs for Notification Service",
    },
    servers: [
      {
        url: "https://notification-service-gqcl.onrender.com", // ✅ Public URL for Render
      },
    ],
  },
  apis: ["./routes/*.js"], // Look in routes folder for JSDoc comments
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Mount routes under /api
app.use("/api", notificationRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at https://notification-service-gqcl.onrender.com/api-docs`);
});
