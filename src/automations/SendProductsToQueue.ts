import { DailyOfferScrapper } from '../utils/scrapper/implementations/DailyOfferScrapper';
import { SendProductToQueue } from '../queues/products/SendProductToQueue';

import { Sentry } from '../monitoring/sentry';

class SendProductsToQueue {
  private scrapper: DailyOfferScrapper;

  private sendProductQueue: SendProductToQueue;

  constructor() {
    this.scrapper = new DailyOfferScrapper();
    this.sendProductQueue = new SendProductToQueue('products-to-post');
  }

  async execute() {
    try {
      const products = await this.scrapper.scraperPage();

      for await (const product of products) {
        await this.sendProductQueue.execute(product);
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }
}

export { SendProductsToQueue };
