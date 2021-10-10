import {Pool} from "pg";
import config from "./config";

export default new Pool({
    host: config.POSTGRES_HOST,
    database: config.POSTGRES_DB,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    port:5432
});
