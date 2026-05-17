import { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // useEffect(() => {
    //     const stored = sessionStorage.getItem('user');

    //     if (stored) {
    //         setUser(JSON.parse(stored));
    //     }
    // }, []);

    const saveUser = (userData) => {
        sessionStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const clearUser = () => {
        sessionStorage.removeItem('user');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, saveUser, clearUser }}>
            {children}
        </AuthContext.Provider>
    );
}   

export function useAuth() {
    return useContext(AuthContext);
}