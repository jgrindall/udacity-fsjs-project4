import path from "path";
import dotenv from "dotenv";

if(!process.env.POSTGRES_DB){
    // config not loaded yet
    dotenv.config({
        path: path.resolve(__dirname, "../.env")
    });
}

export default {
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET as string,
    SALT_ROUNDS: process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS as string),
    BCRYPT_PASSWORD: process.env.BCRYPT_PASSWORD as string,
    POSTGRES_HOST: process.env.POSTGRES_HOST as string,
    POSTGRES_DB: process.env.POSTGRES_DB as string,
    POSTGRES_USER: process.env.POSTGRES_USER as string,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD as string
};

