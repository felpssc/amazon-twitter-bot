import { TweetOffer } from '../automations/TweetOffer';

const tweetProduct = new TweetOffer();

(async () => {
  const result = await tweetProduct.execute();

  // eslint-disable-next-line no-console
  console.log(result);
})();
