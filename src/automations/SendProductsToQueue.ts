import { DailyOfferScrapper } from '../services/productsScrapper/implementations/DailyOfferScrapper';
import { SendProductToQueue } from '../queues/products/SendProductToQueue';

import { Sentry } from '../monitoring/sentry';

class SendProductsToQueue {
  private scrapper: DailyOfferScrapper;

  private sendProductQueue: SendProductToQueue;

  constructor() {
    this.scrapper = new DailyOfferScrapper(
      process.env.PRODUCTS_PAGE_URL as string,
    );
    this.sendProductQueue = new SendProductToQueue(process.env.QUEUE_NAME as string);
  }

  async execute() {
    try {
      const products = await this.scrapper.scrapePage();

      for await (const product of products) {
        await this.sendProductQueue.execute(product);
      }

      Sentry.captureMessage(`Sent ${products.length} new products to queue`, {
        contexts: {
          context: {
            products,
          },
        },
      });
    } catch (error) {
      Sentry.captureException(error);
    }
  }
}

export { SendProductsToQueue };
