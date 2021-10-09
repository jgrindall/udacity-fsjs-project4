/**
 * middleware to protect certain routes
 */

import express from "express";
import jwt from "jsonwebtoken";
import {TokenPayload} from "../../types";

const verifyAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user_id = parseInt(req.params.user_id);
        const JWT_TOKEN_SECRET: string = process.env.JWT_TOKEN_SECRET as string;
        const authorizationHeader: string = req.headers.authorization as string;
        const token: string = authorizationHeader ? authorizationHeader.split(" ")[1] : "";
        const verify: TokenPayload = jwt.verify(token, JWT_TOKEN_SECRET) as TokenPayload;
        if(verify && verify.user.id === user_id) {
            res.locals.auth = verify;
            next();
        } else{
            res.status(401).json(null);
        }
    } catch (error) {
        res.status(401).json(null);
    }
};

export default verifyAuth;
