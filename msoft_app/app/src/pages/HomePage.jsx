import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white">
      <div className="text-center max-w-3xl px-4">
        <h1 className="text-5xl font-extrabold mb-4 hover:text-blue-200 transition-colors duration-300">
          Bienvenido a la aplicación
        </h1>
        <p className="text-xl mb-8">
          Esta es la página de inicio. Disfruta de la experiencia.
        </p>
        <button className="px-6 py-3 bg-teal-600 rounded-lg text-lg font-semibold shadow-md hover:bg-teal-700 transition duration-300">
          Comienza Ahora
        </button>
      </div>
    </div>
  );
};

export default HomePage;
