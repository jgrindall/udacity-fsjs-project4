/**
 * Product
 */
export type Product = {
  id:number;
  title: string;
  price:number;
  description:string;
  fullDescription:string;
  images:string[];
  show:boolean;
}

export type CartItem = {
  product_id: number;
  count:number;
};


/**
 * A shopping cart is just an array of items
 */
export type Cart = CartItem[];


/**
 * join Cart item with products
 */
export type CartItemWithProduct = CartItem & {
  product: Product
}
