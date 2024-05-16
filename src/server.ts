import express, { Request, Response,NextFunction,ErrorRequestHandler } from "express";
import dotenv from "dotenv";
import DB from "./config/database.config";
import authRoutes from './routes/auth.routes';

dotenv.config();
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;



app.use('/api/v1/auth', authRoutes);
DB.sync()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((e: Error) => {
    console.log("Unable to connect to the database:", e);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });