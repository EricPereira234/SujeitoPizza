import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Recebendo o token
    const autToken = req.headers.authorization;
    if (!autToken) {
        return res.status(401).end();
    }

    const [, token] = autToken.split(" ")

    try {
        // validar esse token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad;

        //recuperar o id do token e colocar dentro de uma variável user_id dentro o req
        req.user_id = sub;

        return next();
        
    } catch(err) {
        return res.status(401).end();
    }
}