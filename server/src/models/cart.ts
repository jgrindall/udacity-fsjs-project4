import {Cart} from "../types";
import client from "../database";

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
    async init(){
        const sql1 = `drop table if exists carts`;
        const connection = await client.connect();
        await connection.query(sql1);

        const sql2 = `create table if not exists carts
                         (
                             id              SERIAL PRIMARY KEY,
                             user_id         integer references users(id) on delete cascade
                         )`;
        await connection.query(sql2);
        await connection.release();
    }
}

