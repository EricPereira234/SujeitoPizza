import { Router, Request, Response } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { isAuthenticated } from "./middleware/isAuthenticated";

const router = Router();


//rotas
router.get('/teste', (req: Request, res: Response)=>{
    throw new Error('Erro 404');
});

router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)


export {router};