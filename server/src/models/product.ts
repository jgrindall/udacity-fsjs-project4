import {Product} from "../types";

/**
 * There is no database, just a hard-coded list of products
  */

const list:Product[] = [
    {
        id: 1,
        title: "Product 1",
        description: "1: Lorem ipsum dolor sit amet",
        fullDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        images:[
            "https://johnlewis.scene7.com/is/image/JohnLewis/003839248?$rsp-pdp-port-640$",
            "https://johnlewis.scene7.com/is/image/JohnLewis/003839248alt1?$rsp-pdp-port-640$",
            "https://johnlewis.scene7.com/is/image/JohnLewis/003839248alt2?$rsp-pdp-port-640$",
            "https://johnlewis.scene7.com/is/image/JohnLewis/003839248alt4?$rsp-pdp-port-640$"
        ],
        price: 30,
        show: true
    },
    {
        id: 2,
        title: "Product 2",
        description: "2: Lorem ipsum dolor sit amet",
        fullDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        images:[
            "https://johnlewis.scene7.com/is/image/JohnLewis/005610645?$rsp-pdp-port-640$",
            "https://johnlewis.scene7.com/is/image/JohnLewis/005610645alt1?$rsp-pdp-port-640$",
            "https://johnlewis.scene7.com/is/image/JohnLewis/005610645alt2?$rsp-pdp-port-640$",
            "https://johnlewis.scene7.com/is/image/JohnLewis/005610645alt3?$rsp-pdp-port-640$"

        ],
        price: 20,
        show: true
    },
    {
        id: 3,
        title: "Product 3",
        description: "3: Lorem ipsum dolor sit amet",
        fullDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        images:[
            "https://johnlewis.scene7.com/is/image/JohnLewis/004045156?$rsp-pdp-port-640$",
            "https://johnlewis.scene7.com/is/image/JohnLewis/004045156alt1?$rsp-pdp-port-640$",
            "https://johnlewis.scene7.com/is/image/JohnLewis/004045156alt4?$rsp-pdp-port-640$",
            "https://johnlewis.scene7.com/is/image/JohnLewis/004045156alt3?$rsp-pdp-port-640$"
        ],
        price: 10,
        show: true
    },
];

export class ProductStore {
    constructor() {}

    async index(): Promise<Product[]> {
        return Promise.resolve(list);
    }

    async find(id: number): Promise<Product> {
        const product:Product | undefined = list.find(product=>product.id === id);
        if(product){
            return Promise.resolve(product as Product);
        }
        throw new Error(`Could not get product. ${id}.`);
    }
}




import client from "../database";

export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
};

export type CountedProduct  = Product & { quantity: number };

const validate = (product:Omit<Product, "id">)=>{
    if(product.name && product.price && product.category){
        // ok
    }
    else{
        throw new Error("invalid product");
    }
};

export class ProductStore {
    constructor() {}

    async deleteAll(): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const sql = "delete from products returning *";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not del all products. Error: ${err}`);
        }
    }

    async index(): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const sql = "select * from products";
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
            const sql = "select * from products where id=$1";
            const result = await connection.query(sql, [id]);
            await connection.release();
            return result.rows[0];
        } catch (e) {
            throw new Error("get products error " + e.message);
        }
    }

    async findByCategory(category: string): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const sql = "select * from products where category=$1";
            const result = await connection.query(sql, [category]);
            await connection.release();
            return result.rows;
        } catch (e) {
            throw new Error("get products by category error " + e.message);
        }
    }

    async create(product: Omit<Product, "id">): Promise<Product> {
        try {
            validate(product);
            const sql = "insert into products (name, price, category) values($1, $2, $3) returning *";
            const connection = await client.connect();
            const result = await connection.query(sql, [product.name, product.price, product.category]);
            await connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new product. Error: ${err}`);
        }
    }
}

