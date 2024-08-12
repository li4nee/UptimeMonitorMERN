import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import UserRouter from "./routes/User.route.js";
import ServiceRouter from "./routes/Service.route.js";
import cron from "node-cron";
import checkStatusForAllWebsites from "./businessLogic/checkStatusForAllWebsites.js";
import { addStatusCheckJob } from "./Job/checkStatus.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/user", UserRouter);
app.use("/p", ServiceRouter);

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log("Server running on port:", process.env.PORT);
  }
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MONGO CONNECTED");
  })
  .catch((e) => {
    console.log(e);
  });

cron.schedule("*/1 * * * *", async () => {
  try {
    await addStatusCheckJob();
    console.log("Status check job added to queue.");
  } catch (error) {
    console.error("Error adding status check job to queue:", error);
  }
});
