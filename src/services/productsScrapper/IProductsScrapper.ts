import { Product } from '../../entities/Product';

interface IProductsScrapper {
  scrapePage(): Promise<Product[]>;
}

export { IProductsScrapper };
