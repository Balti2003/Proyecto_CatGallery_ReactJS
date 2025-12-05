//Usa useCats para obtener imagenes, favoritesMap es un objeto para chequear
//si un id esta en favoritos.

import React, { useEffect, useState } from "react";
import { useCats } from "../hooks/useCats";
import CatCard from "./CatCard";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import LoadMoreButton from "./LoadMoreButton";
import BreedFilter from "./BreedFilter";

const CatGallery = ({ favoritesMap, onToggleFavorite, onOpenModal, selectedBreedId, onSelectBreed }) => {
    const { cats, loading, error, loadMore, reload, hasMore } = useCats({ initialLimit: 9 });
    const [initialLoadTriggered, setInitialLoadTriggered] = useState(false);
    
    useEffect(() => {
        // Al cambiar el filtro, usamos reload para resetear la página a 0 y limpiar los resultados anteriores
        const breedIds = selectedBreedId ? selectedBreedId : undefined;
        reload({ limit: 9, breed_ids: breedIds });
        
        // Marcamos que la carga inicial se ha intentado
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setInitialLoadTriggered(true);

    }, [selectedBreedId, reload]);

    const handleLoadMore = () => {
        const breedsIds = selectedBreedId ? selectedBreedId : undefined;
        loadMore({ limit: 9, breed_ids: breedsIds });
    };
    
    return (
        <section className="max-w-5xl mx-auto px-4 py-6">
            <BreedFilter selectedBreedId={selectedBreedId} onSelectBreed={onSelectBreed} /> {/* Nuevo componente de filtro */}

            <ErrorMessage message={error} />
            {(!initialLoadTriggered || loading) && cats.length === 0 ? <Loader /> : null} 
            
            {(initialLoadTriggered && cats.length > 0) && (
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
            )}
            
            {/* Mensaje de no resultados */}
            {initialLoadTriggered && cats.length === 0 && !loading && !error && (
                <p className="text-center text-gray-500 mt-8">No se encontraron gatos para la raza seleccionada.</p>
            )}

            {!loading && hasMore ? (
                <LoadMoreButton onClick={handleLoadMore} />
            ) : null}
        </section>
    );
}
 
export default CatGallery;