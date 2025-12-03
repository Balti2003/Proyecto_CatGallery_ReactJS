//Tarjeta que muestra imagen, nombre de raza si existe y boton para favoritos

import React from "react";

const CatCard = ({ cat,  isFavorite, onToggleFavorite, onOpenModal }) => {
    //cat contiene id, url, breeds(array)
    const breed = (cat.breeds && cat.breeds[0]) || null;
    
    return ( 
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="relative">
                <img
                src={cat.url}
                alt={breed ? `${breed.name}` : 'Cat image'}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => onOpenModal && onOpenModal(cat)}
                />
                <button
                onClick={() => onToggleFavorite(cat)}
                className="absolute top-2 right-2 bg-white/80 hover:bg-white px-2 py-1 rounded-full shadow"
                aria-label="toggle favorite"
                >
                {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
            <div className="p-3">
                <h3 className="font-semibold text-sm truncate">{breed ? breed.name : 'Gato sin raza conocida'}</h3>
                {breed && <p className="text-xs text-gray-600">{breed.origin} · {breed.temperament?.split(',').slice(0,3).join(', ')}</p>}
            </div>
        </div>
    );
}
 
export default CatCard;