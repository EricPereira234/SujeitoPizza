import { createContext, ReactNode, useState } from "react";


type AutContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export  const AuthContext = createContext({} as AutContextData);


export function AuthProvider({children}: AuthProviderProps){
   const [user, setUser] = useState<UserProps>();
   const isAuthenticated = !!user;

  async function signIn(){
    alert('clicou');
   }

    return (
        <AuthContext.Provider value={
           {
             user,
             isAuthenticated,
             signIn,
           }
        }>
           
           {children}
        </AuthContext.Provider>
    )
}