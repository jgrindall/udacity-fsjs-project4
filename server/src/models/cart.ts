import {Cart} from "../types";
import client from "../database";
import bcrypt from "bcryptjs";

export class CartStore {
    constructor() {

    }

    private async getCartIdForUser(user_id:number): Promise<number | null> {
        try {
            const connection = await client.connect();
            const sql1 = `select * from carts where user_id=$1`;
            const result = await connection.query(sql1, [user_id]);
            await connection.release();
            if(result.rows.length >= 1){
                result.rows[0].id;
            }
            return null;
        }
        catch (e) {
            throw new Error(`get products error ${e}`);
        }
    }

    async getCartForUser(user_id:number): Promise<Cart> {
        try {
            const cart_id: number | null = await this.getCartIdForUser(user_id);
            if(cart_id === null){
                return Promise.resolve([]);
            }
            const connection = await client.connect();
            const sql = `select * from cart_items where cart_id = $1`;
            const result = await connection.query(sql, [cart_id]);
            await connection.release();
            const items = result.rows.map(row=>{
                return {
                    product_id:row.product_id,
                    count: row.count
                };
            });
            return Promise.resolve(items);
        }
        catch (e) {
            throw new Error(`get cart error ${e}`);
        }
    }
    private async initCartForUser(user_id: number) : Promise<number | null>{
        try {
            const cart_id: number | null = await this.getCartIdForUser(user_id);
            const connection = await client.connect();
            if (cart_id === null) {
                const sql = 'insert into carts (user_id) values($1) returning *';
                const result = await connection.query(sql, [user_id]);
                await connection.release();
                return Promise.resolve(result.rows[0].id);
            }
            else{
                const sql = `delete from cart_items where cart_id = $1`;
                await connection.query(sql, [cart_id]);
                await connection.release();
                return Promise.resolve(cart_id);
            }
        }
        catch (e) {
            throw new Error(`clear cart error ${e}`);
        }
    }

    async setCartForUser(user_id:number, cart: Cart): Promise<boolean>{
        try {
            const cart_id = await this.initCartForUser(user_id);
            // and insert
            const connection = await client.connect();
            const promises = cart.map(item => {
                const sql = 'insert into cart_items (cart_id, product_id, count) values($1, $2, $3) returning *';
                return connection.query(sql, [cart_id, item.product_id, item.count]);
            });
            await Promise.all(promises);
            await connection.release();
            return Promise.resolve(true);
        }
        catch (e) {
            throw new Error(`get cart error ${e}`);
        }
    }
    async init(){
        const sql1 = `drop table if exists carts`;
        const connection = await client.connect();
        await connection.query(sql1);

        const sql2 = `drop table if exists cart_items`;
        await connection.query(sql2);

        const sql3 = `create table if not exists carts
                         (
                             id              SERIAL PRIMARY KEY,
                             user_id         integer references users(id) on delete cascade
                         )`;
        await connection.query(sql3);

        const sql4 = `create table if not exists cart_items
                         (
                             id              SERIAL PRIMARY KEY,
                             product_id      integer references products(id) on delete cascade,
                             cart_id         integer references carts(id) on delete cascade,
                             count           integer
                         )`;
        await connection.query(sql4);

        await connection.release();
    }
}



export type CartItem = {
    product_id: number;
    count:number;
};