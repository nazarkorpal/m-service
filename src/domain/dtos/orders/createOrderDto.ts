export default interface CreateOrderDto {
  productId: string;
  price: number;
  quantity: number;
  date: Date;
}
