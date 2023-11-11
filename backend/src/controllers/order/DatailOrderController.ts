import { Request, Response } from "express";
import { DatailOrderService } from "../services/order/DetailOrderService";


class DatailOrderController {
    async handle(req: Request, res: Response){
        const order_id = req.query.order_id as string;

        const datailOrderService = new DatailOrderService();

        const order = await datailOrderService.execute({order_id});

        return res.json(order)
    }
}

export { DatailOrderController }