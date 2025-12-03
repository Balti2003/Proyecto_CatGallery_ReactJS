//Boton de ver mas

const LoadMoreButton = ({ onClick, disabled }) => {
    return (
        <div className="flex justify-center py-6">
            <button onClick={onClick}
                disabled={disabled}
                className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50">
                    Ver mas
            </button>
        </div>
    );
}
 
export default LoadMoreButton;