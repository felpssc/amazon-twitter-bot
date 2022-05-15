import { TwitterApi } from 'twitter-api-v2';
import axios from 'axios';
import { Product } from '../../../entities/Product';

interface IAuthParams {
  apiKey: string;
  apiKeySecret: string;
  accessToken: string;
  accessTokenSecret: string;
}

interface IRequest {
  product: Product
}

class TweetAProduct {
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

  async tweet({ product }: IRequest) {
    const twitter = this.twitterClient.readWrite;

    const status = `📢 Alerta de Oferta \n\n📦 ${product.title} \n\n💵 R$ ${product.price}\n\n🔗 ${product.link}`;

    const { data } = await axios.get(product.image, { responseType: 'arraybuffer' });

    const media = await twitter.v1.uploadMedia(data, { mimeType: 'image/jpg' });

    await twitter.v1.tweet(status, { media_ids: [media] });
  }
}

export { TweetAProduct };
