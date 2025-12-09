
    const CatModal = ({ cat, onClose }) => {
    if (!cat) return null;

    const breed = cat.breeds?.[0] ?? null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white max-w-2xl w-full rounded-lg overflow-hidden shadow-lg">
                <div className="flex justify-end p-2">
                    <button onClick={onClose} className="px-3 py-1">Cerrar</button>
                </div>

                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <img src={cat.url} alt="cat" className="w-full h-72 object-cover rounded" />

                    <div>
                        <h3 className="text-xl font-bold mb-2">
                            {breed ? breed.name : "Información no disponible"}
                        </h3>

                        {!breed ? (
                            <p className="text-sm text-gray-500">
                                Esta imagen no incluye datos de raza.
                            </p>
                        ) : (
                            <>
                                <p className="text-sm"><strong>Origen:</strong> {breed.origin}</p>
                                <p className="text-sm"><strong>Temperamento:</strong> {breed.temperament}</p>
                                <p className="text-sm mt-2">{breed.description}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatModal;