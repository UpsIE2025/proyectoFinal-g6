import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import Cursos from "./pages/Cursos";
// Importa otras páginas según sea necesario

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cursos" element={<Cursos />} />
          {/* Añade más rutas aquí según sea necesario */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
