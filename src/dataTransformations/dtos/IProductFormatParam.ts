import { IScrapElementDTO } from '../../services/productsScrapper/interfaces/IScrapElementDTO';

interface IProductFormatParamDTO {
  productsHTML: string;
  defaultElements: IScrapElementDTO;
}

export { IProductFormatParamDTO };
