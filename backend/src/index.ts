import { app } from "./app.js";
import dotenv from 'dotenv'
import { connectDb } from "./DB/mongodbConnection.js";

dotenv.config({
  path: './.env'
})

const port: number = Number(process.env.PORT) || 3000

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
  })
});
