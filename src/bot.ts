import { scheduleJob, RecurrenceRule } from 'node-schedule';
import { SendProductsToQueue } from './automations/SendProductsToQueue';
import { TweetOffer } from './automations/TweetOffer';

const sendDailyOffersToQueueJobTime = new RecurrenceRule();
sendDailyOffersToQueueJobTime.hour = 0;

const tweetOfferJobTime = new RecurrenceRule();
tweetOfferJobTime.minute = 20;

(async () => {
  const sendProductsToQueue = new SendProductsToQueue();

  scheduleJob(sendDailyOffersToQueueJobTime, async () => {
    await sendProductsToQueue.execute();
  });

  const tweetOffer = new TweetOffer();

  scheduleJob(tweetOfferJobTime, async () => {
    await tweetOffer.execute();
  });

  // eslint-disable-next-line no-console
  console.log('🤖 Amazon <> Twitter Bot is working!');
})();
