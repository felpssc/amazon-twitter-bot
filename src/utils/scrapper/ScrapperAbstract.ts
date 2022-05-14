import { Product } from '../../entities/Product';

interface IConstructor {
  url: string;
}

abstract class ScrapperAbstract {
  url: string;

  constructor({ url }: IConstructor) {
    this.url = url;
  }

  abstract scraperPage(): Promise<Product[]>;
}

export { ScrapperAbstract };
