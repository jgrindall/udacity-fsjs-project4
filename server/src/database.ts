import dotenv from "dotenv";
import {Pool} from "pg";
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, "../.env")
});

let POSTGRES_HOST: string;
let POSTGRES_DB: string;
let POSTGRES_USER: string;
let POSTGRES_PASSWORD: string;

const AWS = true;

if(AWS){
    POSTGRES_HOST = "****";
    POSTGRES_DB = "postgres";
    POSTGRES_USER = "postgres";
    POSTGRES_PASSWORD = "****";
}
else{
    POSTGRES_HOST = process.env.POSTGRES_HOST as string;
    POSTGRES_DB = process.env.POSTGRES_DB as string;
    POSTGRES_USER = process.env.POSTGRES_USER as string;
    POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;
}

export default new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port:5432
});
