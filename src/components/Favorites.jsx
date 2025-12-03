// Muestra favoritos desde favoritesList. Los items aqui provienen de localStorage

import React from "react";
import CatCard from "./CatCard";

const Favorites = ({ favoritesList, onToggleFavorite, onOpenModal }) => {
    if (!favoritesList || favoritesList.length === 0) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-12 text-center text-gray-600">
                No tenes favoritos todavia. Hace click en el corazon para agregarlos.
            </div>
        );
    }
    
    return (
        <section className="max-w-5xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {favoritesList.map(cat => (
                    <CatCard
                        key={cat.id}
                        cat={cat}
                        isFavorite={true}
                        onToggleFavorite={() => onToggleFavorite(cat)}
                        onOpenModal={onOpenModal}
                    />
                ))}
            </div>
        </section> 
    );
}
 
export default Favorites;