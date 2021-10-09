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

export type CartItem = {
    product_id: number;
    count:number;
};

/**
 * A shopping cart is just an array of items
 */
export type Cart = CartItem[];

export type Users = {
    id: number;
    username: string;
    password:string;
};

export type TokenPayload = {
    user:Users;
    exp:number;
};