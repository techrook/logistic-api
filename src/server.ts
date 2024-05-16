import express from "express";
import dotenv from "dotenv";
import DB from "./config/database.config";
import authRoutes from './routes/auth.routes';
import packageRoutes from './routes/package.routes'
import User from "./models/users";
import Package from "./models/package";

dotenv.config();
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;


//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/package', packageRoutes);

async function initializeDatabase() {
  try {

    User.associate();
    Package.associate();

    await DB.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to synchronize the database:", error);
  }
}
DB.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return initializeDatabase();
  })
  .catch((e: Error) => {
    console.log("Unable to connect to the database:", e);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });