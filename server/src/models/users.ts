import {Users} from "../types";
import client from "../database";

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
            const sql = "select * from users";
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
            const sql = "select * from users where id=$1";
            const result = await connection.query(sql, [id]);
            await connection.release();
            return result.rows[0];
        } catch (e) {
            throw new Error("get user error " + e.message);
        }
    }

    /**
     * login. username = firstName + space + lastName
     * @return {Promise<Users>} - the created user
     */
    async authenticate(username: string, password: string): Promise<Users | null> {
        const names = username.split(" ");
        const sql = 'select * from users where "firstName" = $1 and "lastName" = $2';
        const connection = await client.connect();
        const result = await connection.query(sql, names);
        await connection.release();
        if(result.rows.length === 1) {
            const user: Users = result.rows[0];
            if(bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                return user;
            }
        }
        return null;
    }

    async init(){

    }
}
