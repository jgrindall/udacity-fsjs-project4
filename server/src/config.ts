/*
const devConfig = {
    JWT_TOKEN_SECRET: "s3cr3t",
    SALT_ROUNDS: 10,
    BCRYPT_PASSWORD: "b33crypt",
    POSTGRES_HOST: "127.0.0.1",
    POSTGRES_DB: "udacity_fsjs_project4",
    POSTGRES_USER: "postgres_udacity",
    POSTGRES_PASSWORD: "p0stgres"
};
*/

const devConfig = {
    JWT_TOKEN_SECRET: "s3cr3t",
    SALT_ROUNDS: 10,
    BCRYPT_PASSWORD: "b33crypt",
    POSTGRES_HOST: "udacity1.c7wd8ws5gdn8.us-west-2.rds.amazonaws.com",
    POSTGRES_DB: "postgres",
    POSTGRES_USER: "postgres",
    POSTGRES_PASSWORD: "p0stgresYur1!"
};

export default {
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET as string || devConfig.JWT_TOKEN_SECRET,
    SALT_ROUNDS: process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS as string) : devConfig.SALT_ROUNDS,
    BCRYPT_PASSWORD: process.env.BCRYPT_PASSWORD as string || devConfig.BCRYPT_PASSWORD,
    POSTGRES_HOST: process.env.POSTGRES_HOST as string || devConfig.POSTGRES_HOST,
    POSTGRES_DB: process.env.POSTGRES_DB as string || devConfig.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER as string || devConfig.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD as string || devConfig.POSTGRES_PASSWORD
};

