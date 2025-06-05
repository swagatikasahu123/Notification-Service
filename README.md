Live Deployment:
 API Base URL: https://notification-service-gqcl.onrender.com/api,
 Swagger Docs: https://notification-service-gqcl.onrender.com/api-docs

Features:
- Send notifications via Email, SMS, or In-App
- Retrieve notifications per user
- REST API with Swagger documentation
- Message queue support using RabbitMQ
- Retry logic

API Endpoints:
- POST /api/notifications: Send a notification
- GET /api/users/:id/notifications: Get all notifications for a user
Refer to the Swagger UI for detailed schema and request/response structure.

1. Prerequisites:
  - Node.js 
  - RabbitMQ server

2. Clone the Repository:
   git clone https://github.com/swagatikasahu123/Notification-Service.git
   cd Notification-Service
   
3. Install Dependencies:
   npm install
   
4. Set Up Environment Variables:
   Create a .env file in the root with the following contents:
   PORT=3000
   RABBITMQ_URL=amqp://localhost

7. Start the Application
   npm start

Test the API:
Use Swagger UI: https://notification-service-gqcl.onrender.com/api-docs

Assumptions Made:
- Notifications are stored in an in-memory or temporary structure.
- RabbitMQ is assumed to be externally running and available.
- Retry logic and queue monitoring are simplified.
- Swagger base URL is hardcoded to the deployed Render URL.
  
![image](https://github.com/user-attachments/assets/44e7ca34-8ae1-4bc9-bd71-4588efd31c99)
![image](https://github.com/user-attachments/assets/0736af88-23e5-4710-8fbf-fa8013f9a2ef)
![image](https://github.com/user-attachments/assets/ac28a5de-16e7-4917-9c22-63d875004084)
![image](https://github.com/user-attachments/assets/79e9fab0-5c6c-4ad5-8bd4-dcf6334124b7)
![image](https://github.com/user-attachments/assets/dee998e9-d3f1-455e-bc24-679756d39260)
![image](https://github.com/user-attachments/assets/d7c7a1b6-bfbc-4373-abf7-509a82dae0a3)
![image](https://github.com/user-attachments/assets/bcac9ace-ee65-42a1-b7d3-a30cbe316cfc)


