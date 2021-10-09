import express from "express";
import { Cart} from "../../types";
import {CartStore} from "../../models/cart";
import verifyAuth from "../middleware/auth";
const store = new CartStore();

export default express
    .Router()

    //get cart. Protected by JWT
    .get("/user/:user_id", [verifyAuth], async (req: express.Request, res: express.Response) => {
        const user_id = parseInt(req.params.user_id);
        const cart:Cart = await store.getCartForUser(user_id);
        res
            .status(200)
            .json(cart);
    })

    //set cart.  Protected by JWT
    .post("/user/:user_id", [verifyAuth], async (req: express.Request, res: express.Response) => {
        const user_id = parseInt(req.params.user_id);
        const cart = req.body as Cart;
        await store.setCartForUser(user_id, cart);
        res
            .status(200)
            .json(cart);
    });
