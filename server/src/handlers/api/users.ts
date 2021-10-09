import express from "express";
import {UsersStore} from "../../models/users";
import jwt from "jsonwebtoken";
import {CartStore} from "../../models/cart";
import {TokenPayload, Users, Cart} from "../../types";

const userStore:UsersStore = new UsersStore();
const cartStore:CartStore = new CartStore();

export default express
    .Router()

    // login. Returns the token to be used later.
    .post("/auth", async (req: express.Request, res: express.Response) => {
        const body = req.body as {username: string; password: string, cart?: Cart};
        const JWT_TOKEN_SECRET: string = process.env.JWT_TOKEN_SECRET as string;

        const user: Users | null = await userStore.authenticate(body.username, body.password);
        if(user) {
            if(body.cart as Cart && (body.cart as Cart).length >= 1){
                await cartStore.setCartForUser(user.id, body.cart as Cart)
            }
            const token:string = jwt.sign({user: user}, JWT_TOKEN_SECRET, {
                expiresIn: "1h"
            });
            const verify:TokenPayload = jwt.verify(token, JWT_TOKEN_SECRET) as TokenPayload;
            res
                .status(200)
                .header("")
                .json({
                    user_id:user.id,
                    access_token:token,
                    expires: verify.exp
                });
        }
        else{
            res
                .status(401)
                .json(null);
        }
    });

