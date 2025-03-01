import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-black flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Bienvenido a la aplicación</h1>
      {isAuthenticated ? (
        <div className="text-center">
          <h2 className="text-2xl mb-4">Hola, {user.name}</h2>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => loginWithRedirect()}
        >
          Iniciar sesión
        </button>
      )}
    </div>
  );
}

export default App;
