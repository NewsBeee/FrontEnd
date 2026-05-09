import { createContext, useContext, useState } from "react";

import Toast from "../components/common/Toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    function showToast(message, type = "info") {
        setToast({ message, type });

        setTimeout(() => {
            setToast(null);
        }, 2500);
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {toast && (
                <Toast message={toast.message} type={toast.type} />
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}