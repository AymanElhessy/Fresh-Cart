export interface Product {
  imageCover: string;
  title: string;
  category: Category;
  description: string;
  ratingsAverage: number;
  price: number;
  _id: string;
  images: string[];
}

export interface Category {
  name: string;
  image: string;
  _id: string;
}

export interface subCategory {
  results: number;
  data: Data[];
}
export interface Data {
  name: string;
}
