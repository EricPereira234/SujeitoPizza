import prismaClient from "../../../prisma";


class ListCategoryService {
    async excute(){
     
        const category = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        return category;

    }
}


export { ListCategoryService }