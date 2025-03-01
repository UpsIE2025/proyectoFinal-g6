import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <div className="bg-white flex flex-col min-h-screen bg-gray-100">
      <nav className="w-full bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Mi Aplicación</h1>
          <div>
            {isAuthenticated ? (
              <div className="flex items-center">
                <span className="text-white mr-4">Hola, {user.name}</span>
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
        </div>
      </nav>
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
