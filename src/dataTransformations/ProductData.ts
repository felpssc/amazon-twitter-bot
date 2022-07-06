/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { load } from 'cheerio';
import { Product } from '../entities/Product';
import { IProductFormatParam } from './interfaces/IProductFormatParam';

class ProductData {
  public format({ productsHTML, defaultElements }: IProductFormatParam): Product[] {
    const $ = load(productsHTML);

    const products = $.root().find('body').children().map((_, product) => product);

    const productsData = products.map((_, product) => {
      const title = $(product).find(`div.${defaultElements.productTitleElement}`).text();
      const price = $(product).find(`.${defaultElements.productPriceElement}`).first().text();
      const wasPrice = $(product).find(`.${defaultElements.productPriceElement}`).last().text();
      const image = $(product).find(defaultElements.productImageElement).attr('src');
      const link = $(product).find(`.${defaultElements.productLinkElement}`).first().attr('href');

      return new Product({
        title,
        price,
        wasPrice,
        image: image as string,
        link: link as string,
      });
    }).toArray().filter((product) => product.price);

    return productsData;
  }
}

export { ProductData };
