/* eslint-disable @typescript-eslint/no-explicit-any */
import amqplib, { Channel, Connection } from 'amqplib';
import { Product } from '../../entities/Product';

class SendProductToQueue {
  private queue: string;

  private connection: Connection | any;

  private channel: Channel | any;

  constructor(queue: string) {
    this.queue = queue;
    this.connection = null;
    this.channel = null;
    this.createConnection();
  }

  async execute(product: Product) {
    this.channel.assertQueue(this.queue, { durable: true });

    this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(product)));
  }

  async close() {
    setTimeout(async () => {
      await this.channel.close();
      await this.connection.close();
    }, 1000);
  }

  async createConnection() {
    this.connection = await amqplib.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
  }
}

export { SendProductToQueue };
