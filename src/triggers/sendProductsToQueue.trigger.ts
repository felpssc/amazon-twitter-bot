import { SendProductsToQueue } from '../automations/SendProductsToQueue';

const sendProductsToQueue = new SendProductsToQueue();

(async () => {
  const result = await sendProductsToQueue.execute();

  // eslint-disable-next-line no-console
  console.log(result);
})();
