import { scheduleJob } from 'node-schedule';
import { SendProductsToQueue } from './automations/SendProductsToQueue';
import { TweetOffer } from './automations/TweetOffer';

import { sentryMonitoring } from './monitoring/sentry';

const runEveryDayAtMidnight = '0 0 * * *';
const runEvery30Minutes = '*/30 * * * *';

(async () => {
  sentryMonitoring();

  const sendProductsToQueue = new SendProductsToQueue();

  scheduleJob(runEveryDayAtMidnight, async () => {
    await sendProductsToQueue.execute();
  });

  const tweetOffer = new TweetOffer();

  scheduleJob(runEvery30Minutes, async () => {
    await tweetOffer.execute();
  });

  // eslint-disable-next-line no-console
  console.log('🤖 Amazon <> Twitter Bot is working!');
})();
