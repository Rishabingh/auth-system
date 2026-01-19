import express, { Express, Request, Response, NextFunction } from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import { errorHandler } from "./utils/ErrorHandler.js";

const app: Express = express();

app.use(cors({
  credentials: true,
  origin: "http://localhost:5173",
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json({limit: '32kb'}));
app.use(express.urlencoded({extended: true}));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({message: 'hello'})
})

// importing routers
import healthCheckRouter from './routes/healthCheck.routes.js';
import authRouter from './routes/auth.routes.js'

// defining routes

app.use('/health-check', healthCheckRouter);
app.use('/user', authRouter);

// global error handler
app.use(errorHandler);

export {
  app
}