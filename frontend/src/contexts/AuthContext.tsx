import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
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
       Router.push('/')
    } catch {
        console.log('erro ao deslogar')
     }
}



export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

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

            // redirecionar o user para /dashboard
            Router.push('/dashboard');
        }catch(erro){
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

            alert('Cadastrado com sucesso !');

            Router.push('/');




        }catch(erro){
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