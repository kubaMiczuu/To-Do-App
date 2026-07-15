import {createContext, type ReactNode, useState} from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null as never)
export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const login = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsAuthenticated(true);
            setIsLoading(false);
        }, 1000)
    }
    const logout = () => {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
