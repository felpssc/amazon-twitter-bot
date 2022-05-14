import { load } from 'cheerio';

import puppeteer from 'puppeteer';

import { ProductData } from '../../../dataTransformations/ProductData';
import { Product } from '../../../entities/Product';
import { IScrapElementDTO } from '../dtos/IScrapElementDTO';
import { ScrapperAbstract } from '../ScrapperAbstract';

class DailyOfferScrapper extends ScrapperAbstract {
  private defaultElements: IScrapElementDTO;

  constructor() {
    super({
      url: 'https://www.amazon.com.br/deals?ref_=nav_cs_gb',
    });

    this.defaultElements = {
      gradeOfertasElement: 'Grid-module__grid_1-xkdMK87Hfx0wjqVxAGcI',
      productTitleElement: 'DealContent-module__truncate_sWbxETx42ZPStTc9jwySW',
      productPriceElement: 'a-price-whole',
      productImageElement: 'img',
    };
  }

  async scraperPage(): Promise<Product[]> {
    const { gradeOfertasElement } = this.defaultElements;

    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();

    await page.goto(this.url, {
      waitUntil: 'networkidle2',
    });

    const html = await page.content();

    await browser.close();

    const $ = load(html);

    const gradeOfertas = $(`div.${gradeOfertasElement}`);

    const products = gradeOfertas.map((index, product) => product).html();

    if (!products) {
      throw new Error('Não foi possível encontrar produtos');
    }

    const productsData = new ProductData().format({
      productsHTML: products,
      defaultElements: this.defaultElements,
    });

    return productsData;
  }
}

export { DailyOfferScrapper };
