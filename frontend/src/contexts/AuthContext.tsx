import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import {toast} from "react-toastify";
import Router from "next/router";
import { api } from "../services/apiClient";


type AutContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: ()=> void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AutContextData);


export function signOut() {
    try {
       destroyCookie(undefined,'@nextauth.token' );
       Router.push('/');
      
    } catch {
        console.log('erro ao deslogar')
     }
}



export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;


    useEffect(()=>{
        //tentar pegar algo no cookie
        const { '@nextauth.token': token } = parseCookies();

        if(token){
            api.get('/me').then(response =>{
                const { id, name, email } = response.data;

                setUser({id, name, email});
            }).catch((erro)=>{
                // Se deu erro deslogamos o user
                signOut();
            })
        }
    },[]);

    //função que loga o usuário
    async function signIn({ email, password }: SignInProps) {
        try{
            const response = await api.post('/session', {email, password});
            //console.log(response.data)
            
            const {id, name, token} = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 *30, // expirar em um mes
                path: "/" // quais caminhos terao acesso ao cookie
            })

            setUser({
                id, name, email
            })

            // passar para proximas requisiçoes o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success("Bem vindo de volta");

            // redirecionar o user para /dashboard
            Router.push('/dashboard');
        }catch(erro){
            toast.error("usuário não logado!");
            console.log("erro ao logar"+erro)
        }
    }

    /// função que cadastra usuários
    async function signUp({name, email, password}: SignUpProps) {
        try{
            
            // aqui cadastra usuarios usando api
            const response = await api.post('/users', {
                name,
                email,
                password
            });

            toast.success('Cadastrado com sucesso !');

            Router.push('/');




        }catch(erro){
            toast.error('erro ao cadastrar')
           console.log("erro ao cadastrar! "+erro);
        }
    }




    return (
        <AuthContext.Provider value={
            {
                user,
                isAuthenticated,
                signIn,
                signOut,
                signUp,
            }
        }>

            {children}
        </AuthContext.Provider>
    )
}