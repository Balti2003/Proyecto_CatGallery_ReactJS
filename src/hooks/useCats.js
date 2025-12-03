//Hook que expone funciones para consumir la api. 
// fetchCats hace la peticion y actualiza el estado, loadMore incrementa la pagina

import { useState, useCallback } from "react";
import { getCatsUrl } from "../api";

export function useCats({ initialLimit = 9 } = {}) {
    const [cats, setCats] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const fetchCats = useCallback(async ({ limit = initialLimit, pageToFetch = 0, mime_types, breed_ids } = {}) => {
        setLoading(true);
        setError(null);
        try {
            const url = getCatsUrl({ limit, page: pageToFetch, mime_types, breed_ids });
            const response = await fetch(url);
            if (!response.ok) throw new Error(`API error: ${response.status}`);
            const data = await response.json(); //array de imagenes
            // Si pageToFetch === 0, reemplazamos; si >0, agregamos
            setCats(prev => pageToFetch === 0 ? data : [...prev, ...data]);
            setHasMore(data.length > 0);
            setPage(pageToFetch);
        } catch (error) {
            setError(error.message || "Error fetching cats");
        } finally {
            setLoading(false);
        }
    }, [initialLimit]);

    const loadMore = useCallback(async ({ limit = initialLimit, mime_types, breed_ids } = {}) => {
        await fetchCats({ limit, pageToFetch: page + 1, mime_types, breed_ids });
    }, [fetchCats, page, initialLimit]);

    const reload = useCallback(async ({ limit = initialLimit, mime_types, breed_ids } = {}) => {
        await fetchCats({ limit, pageToFetch: 0, mime_types, breed_ids });
    }, [fetchCats, initialLimit]);

    return { cats, loading, error, page, hasMore, fetchCats, loadMore, reload };
}