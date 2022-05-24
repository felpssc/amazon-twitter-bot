import { Product } from '../entities/Product';

const tweetStatus = (product: Product) => {
  const { price, wasPrice } = product;

  const header = '📢 Alerta de Oferta';
  const titleInfo = `📦 ${product.title}`;
  const priceInfo = price === wasPrice ? `💵 R$ ${price}` : `💵 De R$ ${wasPrice} por R$ ${price}`;
  const linkInfo = `🔗 ${product.link}`;

  return `${header}\n\n${titleInfo}\n\n${priceInfo}\n\n${linkInfo}`;
};

export {
  tweetStatus,
};
