
export default {
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET as string || "s3cr3t",
    SALT_ROUNDS: process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS as string) : 10,
    BCRYPT_PASSWORD: process.env.BCRYPT_PASSWORD as string || "b33crypt",
    POSTGRES_HOST: process.env.POSTGRES_HOST as string || "127.0.0.1",
    POSTGRES_DB: process.env.POSTGRES_DB as string || "udacity_fsjs_project4",
    POSTGRES_USER: process.env.POSTGRES_USER as string || "postgres_udacity",
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD as string || "p0stgres"
};

