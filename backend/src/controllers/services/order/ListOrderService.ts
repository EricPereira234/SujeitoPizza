import prismaClient from "../../../prisma";



class ListOrderService {
    async execute(){
        const ordens = prismaClient.order.findMany({
            where: {
                draft: false,
                status: false,
            },

            orderBy: {
                created_at: 'desc'
            }
        });

        return ordens;
    }
}


export { ListOrderService }