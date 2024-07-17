import {createContext, FC, ReactNode, useEffect, useState} from "react";

export const AuthContext = createContext({
    isAuthenticated: false,
    validToken: async (): Promise<void> => {}
})
interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const validToken = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/validate-token', {
                method: 'GET',
                headers: {'Authorization': `Bearer ${token}`}
            });
            if(response.ok) {
                setIsAuthenticated(!isAuthenticated);
            }
            else {
                setIsAuthenticated(!isAuthenticated);
            }

        } catch (error) {
            console.error('Error validating token' + error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) validToken();
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, validToken}}>
            {children}
        </AuthContext.Provider>
    )
}