import { useState, useEffect, createContext, useRef } from "react"

export const FlashContext = createContext(null);

const FlashContextProvider = ({ children }) => {
    const [flash, setFlash] = useState(null);
    const timerRef = useRef(null);
    const setFlashMessage = (type, message) => {
        setFlash({ type, message });
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            setFlash({ type: "", message: "" });
        }, 5000);
    }

    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
    }, [])

    return (
        <FlashContext.Provider value={{ flash, setFlashMessage }}>
            {children}
        </FlashContext.Provider>
    )
}

export default FlashContextProvider;