import { Router, Request, Response } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";

import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DatailOrderController } from "./controllers/order/DatailOrderController";

import { isAuthenticated } from "./middleware/isAuthenticated";
import uploadConfig from "./config/multer";

const router = Router();

// configurando envio de imagens
const upload = multer(uploadConfig.upload("./tmp"))


//rotas
router.get('/teste', (req: Request, res: Response)=>{
    throw new Error('Erro 404');
});

router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)


// rota category
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)

// rota produtos
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.get('/category/producty', isAuthenticated, new ListByCategoryController().handle)


// rota de ordens
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/orders', isAuthenticated, new ListOrderController().handle)
router.get('/order/datail', isAuthenticated, new DatailOrderController().handle)




export {router};