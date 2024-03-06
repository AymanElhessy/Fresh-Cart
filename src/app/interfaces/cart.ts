export interface Cart {
  data: Data;
  numOfCartItems: number;
  _id: string;
}
interface Data {
  totalCartPrice: number;
  products: Product[];
  _id: string;
}
interface Product {
  count: number;
  price: number;
  product: innerProduct;
}
interface innerProduct {
  title: string;
  imageCover: string;
  category: Category;
  id: string;
}
interface Category {
  name: string;
}
