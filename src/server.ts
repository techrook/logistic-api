import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { sequelize } from './models';
// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    
    // Sync the models and start the server
    sequelize.sync().then(() => {
      console.log('Database & tables created!');
      
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });