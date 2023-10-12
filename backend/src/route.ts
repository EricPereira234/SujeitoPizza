import { Router, Request, Response } from "express";

const router = Router();


//rotas
router.get('/teste', (req: Request, res: Response)=>{
    throw new Error('Erro 404');
});


export {router};