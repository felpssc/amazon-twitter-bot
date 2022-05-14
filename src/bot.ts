import { scheduleJob, RecurrenceRule } from 'node-schedule';
import { SendProductsToQueue } from './automations/SendProductsToQueue';

const sendDailyOffersToQueueJobTime = new RecurrenceRule();

sendDailyOffersToQueueJobTime.hour = 24;

(async () => {
  const sendProductsToQueue = new SendProductsToQueue();

  scheduleJob(sendDailyOffersToQueueJobTime, async () => {
    await sendProductsToQueue.execute();
  });
})();
