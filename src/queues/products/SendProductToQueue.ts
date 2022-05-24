/* eslint-disable @typescript-eslint/no-explicit-any */
import amqplib, { Connection } from 'amqplib';
import { Product } from '../../entities/Product';

class SendProductToQueue {
  private queue: string;

  constructor(queue: string) {
    this.queue = queue;
  }

  async execute(product: Product) {
    const connection = await this.createConnection();

    const channel = await connection.createChannel();

    channel.assertQueue(this.queue, { durable: true });

    channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(product)));

    await this.closeConnection(connection);
  }

  async closeConnection(connection: Connection) {
    setTimeout(async () => {
      await connection.close();
    }, 500);
  }

  async createConnection() {
    const connection = await amqplib.connect('amqp://localhost');

    return connection;
  }
}

export { SendProductToQueue };
