interface ICreateProduct {
  title: string;
  price: string;
  wasPrice: string;
  image: string;
  link: string;
}

class Product {
  title: string;

  price: string;

  wasPrice: string;

  image: string;

  link: string;

  constructor({
    title, price, wasPrice, image, link,
  }: ICreateProduct) {
    this.title = title;
    this.price = price;
    this.wasPrice = wasPrice;
    this.image = image;
    this.link = link;
  }
}

export { Product };
