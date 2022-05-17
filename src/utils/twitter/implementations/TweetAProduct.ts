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

    const {
      title,
      price,
      wasPrice,
      link,
      image,
    } = product;

    const status = `📢 Alerta de Oferta \n\n📦 ${title} \n\n💵 De R$ ${wasPrice} por R$ ${price} \n\n🔗 ${link}`;

    const { data } = await axios.get(image, { responseType: 'arraybuffer' });

    const media = await twitter.v1.uploadMedia(data, { mimeType: 'image/jpg' });

    await twitter.v1.tweet(status, { media_ids: [media] });
  }
}

export { TweetAProduct };
