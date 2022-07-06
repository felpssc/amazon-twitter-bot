import { TwitterApi } from 'twitter-api-v2';
import axios from 'axios';
import { Product } from '../../../entities/Product';
import { tweetStatus } from '../../../helpers/tweetStatus.helper';
import { ITweetProduct } from '../ITweetProduct';

interface IAuthParams {
  apiKey: string;
  apiKeySecret: string;
  accessToken: string;
  accessTokenSecret: string;
}

class TweetProduct implements ITweetProduct {
  private twitterClient: TwitterApi;

  constructor({
    apiKey, apiKeySecret, accessToken, accessTokenSecret,
  }: IAuthParams) {
    this.twitterClient = new TwitterApi({
      appKey: apiKey,
      appSecret: apiKeySecret,
      accessToken,
      accessSecret: accessTokenSecret,
    });
  }

  async tweet(product: Product): Promise<void> {
    const twitter = this.twitterClient.readWrite;

    const status = tweetStatus(product);

    const { data } = await axios.get(product.image, { responseType: 'arraybuffer' });

    const images = [
      await twitter.v1.uploadMedia(data, { mimeType: 'image/jpg' }),
      await twitter.v1.uploadMedia(data, { mimeType: 'image/jpg' }),
    ];

    await twitter.v1.tweet(status, { media_ids: images });
  }
}

export { TweetProduct };
