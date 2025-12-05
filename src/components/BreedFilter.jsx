//componente que usa useBreeds para renderizar un menu desplegable de razas

import { useBreeds } from "../hooks/useBreeds";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const BreedFilter = ({ selectedBreedId, onSelectBreed }) => {
    const { breeds, loading, error } = useBreeds();

    const handleChange = (event) => {
        onSelectBreed(event.target.value);
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    //añadimos opcion "todos" con valor vacio
    const allBreeds = [{ id: "", name: "Todas las razas" }, ...breeds];
    
    return (
        <div className="flex justify-center py-4">
            <select
                value={selectedBreedId}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
                {allBreeds.map((breed) => (
                    <option key={breed.id} value={breed.id}>
                        {breed.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default BreedFilter;