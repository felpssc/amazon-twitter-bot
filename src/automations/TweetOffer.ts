/* eslint-disable no-console */
import 'dotenv/config';

import { GetProductFromQueue } from '../queues/products/GetProductFromQueue';

import { TweetAProduct } from '../utils/twitter/implementations/TweetAProduct';

import { SendProductToQueue } from '../queues/products/SendProductToQueue';

import { Sentry } from '../monitoring/sentry';

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
      Sentry.captureMessage('No product found in queue', {
        contexts: {
          context: {
            date: new Date(),
          },
        },
      });
      return;
    }

    try {
      await this.tweetAProduct.tweet({ product });

      Sentry.captureMessage('Product tweeted successfully', {
        contexts: {
          context: {
            product,
            date: new Date(),
          },
        },
      });
    } catch (error) {
      Sentry.captureException(error, {
        contexts: {
          context: {
            product,
          },
        },
      });

      Sentry.captureMessage('Sending product to queue again', {
        contexts: {
          context: {
            product,
          },
        },
      });

      await new SendProductToQueue('products-to-post').execute(product);
    }
  }
}

export { TweetOffer };
