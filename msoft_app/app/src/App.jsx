import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import Cursos from "./pages/Cursos";
import client from "./graphql/client";
import { ApolloProvider } from "@apollo/client";
import Estudiantes from "./pages/Estudiantes";
import Matriculas from "./pages/Matriculas";
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
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="cursos" element={<Cursos />} />
            <Route path="estudiantes" element={<Estudiantes />} />
            <Route path="matriculas/:ID_Estudiante" element={<Matriculas />} />
          </Route>
        </Routes>
      </ApolloProvider>
    </Router>
  );
}

export default App;
