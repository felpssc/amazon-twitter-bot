import { Product } from '../../entities/Product';

interface ITweetProduct {
  tweet(product: Product): Promise<void>;
}

export { ITweetProduct };
