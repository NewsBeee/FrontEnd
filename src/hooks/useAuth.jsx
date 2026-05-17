import { createContext, useContext, useState, useEffect } from 'react'
import { checkAuth } from '../api/authApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        async function initAuth() {
            try {
                const data = await checkAuth();

                if (data.result?.is_login) {
                    setUser(data.result);
                } else {
                    setUser(null);
                }
            } catch (err) {
                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        }    

        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, authLoading }}>
            {children}
        </AuthContext.Provider>
    );
}   

export function useAuth() {
    return useContext(AuthContext);
}