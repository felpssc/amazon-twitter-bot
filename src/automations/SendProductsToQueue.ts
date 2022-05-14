import { DailyOfferScrapper } from '../utils/scrapper/implementations/DailyOfferScrapper';
import { SendProductToQueue } from '../queues/products/SendProductToQueue';

class SendProductsToQueue {
  private scrapper: DailyOfferScrapper;

  private sendProductQueue: SendProductToQueue;

  constructor() {
    this.scrapper = new DailyOfferScrapper();
    this.sendProductQueue = new SendProductToQueue('products-to-post');
  }

  async execute() {
    const products = await this.scrapper.scraperPage();

    for await (const product of products) {
      await this.sendProductQueue.execute(product);
    }

    // await this.sendProductQueue.close(); => Is it necessary?
  }
}

export { SendProductsToQueue };
