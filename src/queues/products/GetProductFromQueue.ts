/* eslint-disable @typescript-eslint/no-explicit-any */
import amqplib, { Connection } from 'amqplib';
import { Product } from '../../entities/Product';

class GetProductFromQueue {
  private queue: string;

  constructor(queue: string) {
    this.queue = queue;
  }

  async execute(): Promise<Product | null> {
    const connection = await this.createConnection();

    const channel = await connection.createChannel();

    const message = await channel.get(this.queue);

    if (!message) {
      return null;
    }

    channel.ack(message);

    const product = JSON.parse(message.content.toString());

    await this.closeConnection(connection);

    return product;
  }

  async createConnection() {
    const connection = await amqplib.connect('amqp://localhost');

    return connection;
  }

  async closeConnection(connection: Connection) {
    setTimeout(async () => {
      await connection.close();
    }, 500);
  }
}

export { GetProductFromQueue };
