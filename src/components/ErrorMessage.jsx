//Muestra un mensaje de error

const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return ( 
        <div className="bg-red-100 text-red-800 px-4 py-3 rounded-md">
            <strong>Error:</strong> {message}
        </div>
    );
}
 
export default ErrorMessage;