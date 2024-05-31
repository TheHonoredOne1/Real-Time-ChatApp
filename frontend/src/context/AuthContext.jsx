import React from "react";
import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("chat-user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setAuthUser(parsedUser);
            } catch (error) {
                console.error('Failed to parse user from localStorage:', error);
                setAuthUser(null);
            }
        }
    }, []);


    return (<AuthContext.Provider value={{ authUser, setAuthUser }}>
        {children}
    </AuthContext.Provider>);
};