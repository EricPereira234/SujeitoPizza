import prismaClient from '../../../prisma';
import { hash } from 'bcryptjs';


interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){

        //verificando se ele enviou um email
        if(!email){
            throw new Error("Esse email incorrect");
        }

        //verifica se esse email já está cadastrado na plataforma
        const userAlereadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if(userAlereadyExists){
            throw new Error ('esse usuário já existe')
        }


        //criptografando senha com o bcryptjs antes de salvar 
        const passwordHash = await hash(password, 8);

        //cadastrando usuario no banco
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },

            select: {
                id: true,
                name: true,
                email: true,
            }
        })
    
        return user;
    }
}

export {CreateUserService}