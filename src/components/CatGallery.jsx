//Usa useCats para obtener imagenes, favoritesMap es un objeto para chequear
//si un id esta en favoritos.

import React, { useEffect, useState } from "react";
import { useCats } from "../hooks/useCats";
import CatCard from "./CatCard";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import LoadMoreButton from "./LoadMoreButton";

const CatGallery = ({ favoritesMap, onToggleFavorite, onOpenModal }) => {
    const { cats, loading, error, loadMore, fetchCats, hasMore } = useCats({ initialLimit: 9 });
    const [initialLoaded, setInitialLoaded] = useState(false);
    
    useEffect(() => {
        //cargar la primera pagina al montar el componente
        fetchCats({ limit: 9,pageToFetch: 0 });
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setInitialLoaded(true);
    }, [fetchCats]);
    
    return (
        <section className="max-w-5xl mx-auto px-4 py-6">
            <ErrorMessage message={error} />
            {!initialLoaded || loading ? <Loader /> : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {cats.map(cat => (
                    <CatCard
                        key={cat.id}
                        cat={cat}
                        isFavorite={!!favoritesMap[cat.id]}
                        onToggleFavorite={() => onToggleFavorite(cat)}
                        onOpenModal={onOpenModal}
                    />
                ))}
            </div>

            {!loading && hasMore ? (
                <LoadMoreButton onClick={() => loadMore({ limit: 9 })} />
            ) : null}
        </section>
    );
}
 
export default CatGallery;