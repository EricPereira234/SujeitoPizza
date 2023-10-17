import { Router, Request, Response } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";

const router = Router();


//rotas
router.get('/teste', (req: Request, res: Response)=>{
    throw new Error('Erro 404');
});

router.post('/users', new CreateUserController().handle)


export {router};