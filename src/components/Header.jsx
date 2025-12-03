//header con botones para cambiar entre galeria y favoritos

import React from "react";

const Header = ({ currentView, setView, favoritesCount }) => {
    return ( 
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-00">CatGallery 🐾</h1>
                <nav className="flex items-center gap-3">
                    <button onClick={() => setView("gallery")}
                        className={`px-3 py-1 rounded ${currentView === 'gallery' ? 'bg-indigo-600 text-white' : 'text-gray-700'}`}>
                        Galeria
                    </button>
                    <button onClick={() => setView("favorites")}
                        className={`px-3 py-1 rounded flex items-center gap-2 ${currentView === 'favorites' ? 'bg-indigo-600 text-white' : 'text-gray-700'}`}>
                        Favoritos
                        <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded text-sm">{favoritesCount}</span>
                    </button>
                </nav>
            </div>
        </header>
    );
}
 
export default Header;