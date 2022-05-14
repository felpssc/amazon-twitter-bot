interface ICreateProduct {
  title: string;
  price: string;
  wasPrice: string;
  productImage: string;
}

class Product {
  title: string;

  price: string;

  wasPrice: string;

  productImage: string;

  constructor({
    title, price, wasPrice, productImage,
  }: ICreateProduct) {
    this.title = title;
    this.price = price;
    this.wasPrice = wasPrice;
    this.productImage = productImage;
  }
}

export { Product };
