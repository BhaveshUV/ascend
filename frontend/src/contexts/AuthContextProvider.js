import { useState, useEffect, createContext, useContext } from "react";
import { LOGGED_IN_USER_URL } from "../utils/constants";
import { FlashContext } from "./FlashContextProvider";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { setFlashMessage } = useContext(FlashContext);

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const response = await fetch(LOGGED_IN_USER_URL, {
                    credentials: "include"
                });
                const data = await response.json();
                if (!data.user) setFlashMessage("error", "Log in to create, edit and delete")
                console.dir(data.user);
                setCurrUser(data.user);
                setLoading(false);
            } catch (e) {
                console.dir(e);
                setFlashMessage("error", "Connection with server failed: " + e);
            }
        }
        getLoggedInUser();
    }, [])

    return (
        <AuthContext.Provider value={{ currUser, setCurrUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;