import { Queue, Worker } from "bullmq";
import client from "../config/redis.config.js";
import checkStatusForAllWebsites from "../businessLogic/checkStatusForAllWebsites.js";
import logger from "../config/logger.config.js";

export const statusCheckQueue = new Queue("statusCheckQueue", {
  connection: client,
});

const statusCheckWorker = new Worker(
  "statusCheckQueue",
  async (job) => {
    try {
      await checkStatusForAllWebsites();
    } catch (error) {
      logger.error(error.message);
      console.error("Error processing status check job:", error);
    }
  },
  {
    connection: client,
  }
);

statusCheckWorker.on("completed", (job) => {
  logger.info(`Job ${job.id} completed`);
  console.log(`Job ${job.id} completed`);
});

statusCheckWorker.on("failed", (job, err) => {
  logger.error(`Job ${job.id} failed with error: ${err.message}`);
  console.error(`Job ${job.id} failed with error: ${err.message}`);
});

export const addStatusCheckJob = async () => {
  await statusCheckQueue.add("checkStatus", {});
};
