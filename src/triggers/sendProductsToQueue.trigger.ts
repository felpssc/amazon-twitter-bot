/* eslint-disable no-console */
import { SendProductsToQueue } from '../automations/SendProductsToQueue';

const sendProductsToQueue = new SendProductsToQueue();

(async () => {
  try {
    await sendProductsToQueue.execute();
    console.log('Successfully sent products to queue');
  } catch (error) {
    console.log(error);
  }
})();
