import prismaClient from "../../../prisma";

interface CategoryRequest{
    name: string;
}

class CreateCategoryService {
    async execute({name}: CategoryRequest){
       
        if(name === ' '){
           throw new Error('Name ivalid')
        }

        const categorys = await prismaClient.category.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true,
            }
        })

        return categorys;
    }
}


export { CreateCategoryService }