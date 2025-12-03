//Hook generico para sincronizar un estado con localstorage

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
    const [state, setState] = useState(() => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : initialValue;
        } catch (error) {
            console.error("Error reading localStorage:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error("Error writing localStorage:", error);
        }
    }, [key, state]);

    return [state, setState];
}
    