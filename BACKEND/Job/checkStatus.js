import { Queue, Worker } from "bullmq";
import client from "../config/redis.config.js";
import checkStatusForAllWebsites from "../businessLogic/checkStatusForAllWebsites.js";
import logger from "../config/logger.config.js";

export const statusCheckQueue = new Queue("statusCheckQueue", {
  defaultJobOptions: {
    attempts: 3, // Number of times a job should be retried if it fails.

    // Define a backoff strategy for retrying failed jobs.
    backoff: {
      type: "fixed",
      delay: 10000, // Retry delay in milliseconds
    },
    removeOnComplete: true,
    // removeOnFail: {
    //     count:100,
    //     age:60*60*24 // fail bhaye 24 ghanta samma bascha redis mai
    // },
    removeOnFail: true,
  },
  // Control the rate at which jobs are processed.
  limiter: {
    max: 100, // Maximum number of jobs to process per interval
    duration: 60000, // Interval in milliseconds
  },
  settings: {
    stalledInterval: 30000, // Time interval to check for stalled jobs
    maxStalledCount: 3, // Maximum number of times a job can be stalled
  },
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
