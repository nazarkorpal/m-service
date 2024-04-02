import Product from "./Product";

export default interface Arrival {
  id: string;
  price: number;
  quantity: number;
  date: Date;
  productId: string;
  product?: Product;
}
