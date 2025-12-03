//componente raiz. Mantiene view(galeria/favoritos), favorites en localStorage y abre modal.
//handleToggleFavorite agrega/quita favoritos.

import './App.css'
import React, { useMemo, useState } from 'react';
import Header from "./components/Header";
import CatGallery from "./components/CatGallery";
import Favorites from "./components/Favorites";
import CatModal from "./components/CatModal";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [view, setView] = useState("gallery");
  const [favorites, setFavorites] = useLocalStorage("cat_favorites", []);
  const [modalCat, setModalCat] = useState(null);

  //Chequeamos rapido si un cat.id esta en favoritos, usamos un mapa
  const favoritesMap = useMemo(() => {
    const map = {};
    favorites.forEach(c => {
      map[c.id] = true;
    });
    return map;
  }, [favorites]);

  const handleToggleFavorite = (cat) => {
    //cat: objeto con id, url, breeds...
    const exists = favoritesMap[cat.id];
    if (exists) {
      setFavorites(prev => prev.filter(item => item.id !== cat.id));
    } else {
      setFavorites(prev => [cat, ...prev]);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={view} setView={setView} favoritesCount={favorites.length} />

      <main className="pt-6 pb-12">
        {view === 'gallery' ? (
          <CatGallery
            favoritesMap={favoritesMap}
            onToggleFavorite={handleToggleFavorite}
            onOpenModal={(cat) => setModalCat(cat)}
          />
        ) : (
          <Favorites
            favoritesList={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenModal={(cat) => setModalCat(cat)}
          />
        )}

        <CatModal cat={modalCat} onClose={() => setModalCat(null)} />
      </main>
    </div>
  );
}

export default App
