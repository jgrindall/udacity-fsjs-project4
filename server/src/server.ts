import express, {Request, Response, Application} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cartRoutes from "./handlers/api/carts";
import productRoutes from "./handlers/api/products";
import usersRoutes from "./handlers/api/users";
import {UsersStore} from "./models/users";
import {ProductStore} from "./models/product";
import config from "./config";
import {CartStore} from "./models/cart";

const app: Application = express();

const port: number = process.env.PORT ? parseInt(process.env.PORT as string) : 3000;

app.use(bodyParser.json());

app.use(cors({
    origin: [
        '*',
        'http://jgrindalludacity.s3.us-west-2.amazonaws.com',
        'https://jgrindalludacity.s3.us-west-2.amazonaws.com'
    ]
}));

// set up routing
app.use("/api/cart/", cartRoutes);
app.use("/api/products/", productRoutes);
app.use("/api/users/", usersRoutes);

app.get("/", async function(req: Request, res: Response) {
    const users = await new UsersStore().index();
    const products = await new ProductStore().index();
    res.send(`Hello Store! ${config.POSTGRES_HOST} ${config.POSTGRES_DB} ${config.POSTGRES_USER} ${config.POSTGRES_PASSWORD} ${users.length} ${products.length}`);
});

async function init(){
    console.log("delete carts");
    await new CartStore().destroy();

    console.log("delete products");
    await new ProductStore().destroy();

    console.log("delete users");
    await new UsersStore().destroy();


    console.log("add users");
    await new UsersStore().init();

    console.log("add products");
    await new ProductStore().init();

    console.log("add carts");
    await new CartStore().init();
}

app.listen(port, async function() {
    console.log(`starting app on port: ${port}`);
    await init();
    console.log("started");
});

export default app;
