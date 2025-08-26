import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { configViewEngine } from './config/viewEngine';
import { initWebRoutes } from './routes/web';
import { connectDB } from './config/configdb';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
initWebRoutes(app);
connectDB();

const port: number = parseInt(process.env.PORT as string) || 6969;

app.listen(port, (): void => {
    console.log(`Backend Nodejs is running on the port: ${port}`);
});
