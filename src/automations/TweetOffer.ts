/* eslint-disable no-console */
import 'dotenv/config';

import { GetProductFromQueue } from '../queues/products/GetProductFromQueue';

import { TweetAProduct } from '../utils/twitter/implementations/TweetAProduct';

import { SendProductToQueue } from '../queues/products/SendProductToQueue';

class TweetOffer {
  getProductFromQueue: GetProductFromQueue;

  tweetAProduct: TweetAProduct;

  authPayload = {
    apiKey: process.env.API_KEY as string,
    apiKeySecret: process.env.API_KEY_SECRET as string,
    accessToken: process.env.ACCESS_TOKEN as string,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
  };

  constructor() {
    this.getProductFromQueue = new GetProductFromQueue('products-to-post');
    this.tweetAProduct = new TweetAProduct(this.authPayload);
  }

  async execute() {
    const product = await this.getProductFromQueue.execute();

    if (!product) {
      return;
    }

    try {
      await this.tweetAProduct.tweet({ product });

      console.log(`Product tweeted successfully at ${new Date()}`, product);
    } catch (error) {
      console.log('Error while trying to tweet a product', error);

      console.log('Inserting product again in the queue', product);

      await new SendProductToQueue('products-to-post').execute(product);
    }
  }
}

export { TweetOffer };
