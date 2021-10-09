import express, {Request, Response, Application} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cartRoutes from "./handlers/api/carts";
import productRoutes from "./handlers/api/products";
import usersRoutes from "./handlers/api/users";
import dotenv from "dotenv";
import path from "path";

const app: Application = express();

dotenv.config({
    path: path.resolve(__dirname, "../.env")
});

const port: number = 3000;

app.use(bodyParser.json());

app.use(cors({
    origin: [
        'http://localhost:4200'
    ]
}));

// set up routing
app.use("/api/cart/", cartRoutes);
app.use("/api/products/", productRoutes);
app.use("/api/users/", usersRoutes);

app.get("/", function(req: Request, res: Response) {
    res.send("Hello World!");
});

app.listen(port, function() {
    console.log(`starting app on port: ${port}`);
});

export default app;
