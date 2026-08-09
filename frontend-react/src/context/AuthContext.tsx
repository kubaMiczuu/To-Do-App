import {createContext, type ReactNode, useCallback, useEffect, useState} from "react";
import {axiosClient} from "../api/axiosClient.ts";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    checkSession: () => Promise<void>
    logout: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>(null as never)

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const checkSession = useCallback(async () => {
        try {
            await axiosClient.get("/users/me");
            setIsAuthenticated(true);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        checkSession().catch(console.error);
    }, [checkSession])

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center text-2xl font-bold">Session authentication...</div>;
    }

    const logout = async () => {
        try {
            await axiosClient.post("/auth/logout");
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Logout error", error);
        }
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, isLoading, checkSession, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
