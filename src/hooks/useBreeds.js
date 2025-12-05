//hook que se encarga de llamar a la api para obtener la lista de razas

import { useState, useEffect } from "react";
import { getBreedsUrl } from "../api";

export function useBreeds() {
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const url = getBreedsUrl();
                const response = await fetch(url);
                if (!response.ok) throw new Error(`API error: ${response.status}`);
                const data = await response.json();
                setBreeds(data);
            } catch (error) {
                console.error("Error fetching breeds:", error);
                const errorMessage = (error instanceof Error) ? error.message : "Error cargando razas";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        }

        fetchBreeds();
    }, []);
    
    return { breeds, loading, error };
}