/* eslint-disable no-console */
import { TweetOffer } from '../automations/TweetOffer';

const tweetProduct = new TweetOffer();

(async () => {
  try {
    await tweetProduct.execute();
    console.log('Successfully tweeted product');
  } catch (error) {
    console.log(error);
  }
})();
