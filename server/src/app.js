import express from 'express';
import cors from 'cors';

import errorHandler from './middleware/error.middleware.js';
import messageRoutes from './routes/message.route.js';

const app = express();
const allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(['/api/messages', '/api/v1/messages'], messageRoutes);

app.use(errorHandler);

export default app;