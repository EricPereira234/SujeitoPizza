import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import cors from 'cors';


import { router } from "./route";

const app = express();

//tipo de dados
app.use(express.json());

// responsável para deixer a aplicação livre para qualquer ip fazer requisinção
app.use(cors());

//esse é o arquivo das rotas
app.use(router);

//tratando erros
app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof Error){
        //se for uma instancia do tipo error 
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
});


app.listen(4000, ()=>console.log('Servidor rodando!'));