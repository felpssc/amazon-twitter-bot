import { IScrapElementDTO } from '../../utils/scrapper/dtos/IScrapElementDTO';

interface IProductFormatParamDTO {
  productsHTML: string;
  defaultElements: IScrapElementDTO;
}

export { IProductFormatParamDTO };
