import {Product} from "../types";
import defaultProducts from "./defaultProducts";
import client from "../database";

/**
 * There is no database, just a hard-coded list of products
  */


export class ProductStore {
    constructor() {}

    async index(): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const sql = `select * from products`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }

    async find(id: number): Promise<Product> {
        try {
            const connection = await client.connect();
            const sql = `select * from products where id=$1`;
            const result = await connection.query(sql, [id]);
            await connection.release();
            return result.rows[0];
        } catch (e) {
            throw new Error("get products error " + e.message);
        }
    }

    async createProduct(product:Product):Promise<Product>{
        const sql = `insert into products
                    (title, price, description, fullDescription, image)
                    values($1, $2, $3, $4, $5)
                    returning *`;

        const connection = await client.connect();
        const result = await connection.query(sql, [product.title, product.price, product.description,  product.fullDescription, product.image]);
        await connection.release();
        return result.rows[0];
    }

    async init() : Promise<Product[]>{
        try {

            const sql1 = `drop table if exists products`;
            const connection = await client.connect();
            await connection.query(sql1);

            const sql2 = `create table if not exists products
                         (
                             id              SERIAL PRIMARY KEY,
                             title           varchar(64),
                             price           integer,
                             description     varchar(64),
                             fullDescription varchar(1024),
                             image           varchar(128),
                             category        varchar(64)
                         )`;

            await connection.query(sql2);
            await connection.release();

            const promises:Promise<Product>[] = defaultProducts.map((p:Product) => {
                return this.createProduct(p);
            });
            return await Promise.all(promises);
        } catch (err) {
            throw new Error(`Could not add new product. Error: ${err}`);
        }
    }
}
