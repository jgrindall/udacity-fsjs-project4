import {Users} from "../types";
import client from "../database";
import bcrypt from "bcryptjs";
import defaultUsers from "./defaultUsers";

const BCRYPT_PASSWORD: string = process.env.BCRYPT_PASSWORD as string;
const SALT_ROUNDS: string = process.env.SALT_ROUNDS as string;

export class UsersStore {
    constructor() {}

    /**
     * list all users.
     * @returns {Promise<Users[]>}
     */
    async index(): Promise<Users[]> {
        try {
            const connection = await client.connect();
            const sql = `select * from users`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    /**
     * show one user
     * @param id
     * @return {Promise<Users>}
     */
    async find(id: number): Promise<Users> {
        try {
            const connection = await client.connect();
            const sql = `select * from users where id=$1`;
            const result = await connection.query(sql, [id]);
            await connection.release();
            return result.rows[0];
        } catch (e) {
            throw new Error(`get user error ${e}`);
        }
    }

    /**
     * login. username = firstName + space + lastName
     * @return {Promise<Users>} - the created user
     */
    async authenticate(username: string, password: string): Promise<Users | null> {
        const sql = `select * from users
                    where "username" = $1`;
        const connection = await client.connect();
        const result = await connection.query(sql, [username]);
        await connection.release();
        if(result.rows.length === 1) {
            const user: Users = result.rows[0];
            if(bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                return user;
            }
        }
        return null;
    }

    /**
     * create
     * @param {Omit<Users, id>} user to create
     * @return {Promise<Users>} - the created user
     */
    async createUser(user: Omit<Users, "id">): Promise<Users> {
        try {
            const hash = bcrypt.hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
            const sql = 'insert into users ("username", password) values($1, $2) returning *';
            const connection = await client.connect();
            const result = await connection.query(sql, [user.username, hash]);
            await connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`);
        }
    }

    async destroy(){
        const sql = `drop table if exists users`;
        const connection = await client.connect();
        await connection.query(sql);
    }

    async init(){

        const connection = await client.connect();

        const sql = `create table if not exists users
                         (
                             id                 SERIAL PRIMARY KEY,
                             username           varchar(64),
                             password           varchar(1024)
                         )`;

        await connection.query(sql);
        await connection.release();

        const promises:Promise<Users>[] = defaultUsers.map((user:Omit<Users, "id">) => {
            return this.createUser(user);
        });
        return await Promise.all(promises);


    }
}
