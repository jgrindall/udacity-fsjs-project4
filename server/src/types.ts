/**
 * Product
 */
export type Product = {
    id:number;
    title: string;
    price:number;
    description:string;
    fullDescription:string;
    image:string;
    category?:string;
}

export type CountedProduct  = Product & { quantity: number };

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

export type Users = {
    id: number;
    username: string;
};

export type TokenPayload = {
    user:Users;
    exp:number;
};