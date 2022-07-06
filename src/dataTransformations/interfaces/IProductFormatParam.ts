import { IScrapElements } from '../../services/productsScrapper/interfaces/IScrapElements';

interface IProductFormatParam {
  productsHTML: string;
  defaultElements: IScrapElements;
}

export { IProductFormatParam };
