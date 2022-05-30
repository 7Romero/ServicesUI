import { createContext } from "react";

export type UserContextType = {
    id: string | undefined,
    username: string | undefined,
    roles: string[] | undefined,
}

type AuthContextType = {
    isLoaded: boolean,
    token: string | undefined,
    user: UserContextType | undefined,
    setUser: (userData: UserContextType | undefined) => void,
    setToken: (tokenData: string | undefined) => void,
    logOut: () => void,
}

export const AuthContext = createContext<AuthContextType>({
    isLoaded: false,
    token: undefined,
    user: undefined,
    setUser: () => {},
    setToken: () => {},
    logOut: () => {},
});