import express from "express";
import {ProductStore} from "../../models/product";
import {Product} from "../../types";

const store = new ProductStore();

export default express
    .Router()

    // list all available products
    .get("/", async (req: express.Request, res: express.Response) => {
        const orders = await store.index();
        res
            .status(200)
            .json(orders);
    })

    //get a specific product
    .get("/:id", async (req: express.Request, res: express.Response) => {
        const id = parseInt(req.params.id);
        const product: Product = await store.find(id);
        res
            .status(200)
            .json(product);
    });