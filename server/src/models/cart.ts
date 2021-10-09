import {Cart} from "../types";

const cartData:Record<number, Cart> = {
   // there is no database, I simply map user id to cart.
};

export class CartStore {
    constructor() {

    }
    async getCartForUser(user_id:number): Promise<Cart> {
        return Promise.resolve(cartData[user_id] || []);
    }
    async setCartForUser(user_id:number, cart: Cart){
        cartData[user_id] = cart;
        return Promise.resolve(true);
    }
}
