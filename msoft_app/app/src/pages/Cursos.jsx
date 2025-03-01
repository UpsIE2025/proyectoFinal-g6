import React from "react";
import { GET_CURSOS } from "../graphql/queries";
import client from "../graphql/client";

const Cursos = () => {
  const { loading, error, data } = client.query({
    params: { query: GET_CURSOS },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Gestión de Cursos</h1>
      <ul>
        {data.cursos.map((curso) => (
          <li key={curso.Codigo} className="mb-4 p-4 border rounded shadow">
            <h2 className="text-2xl font-bold">{curso.Nombre}</h2>
            <p>Estado: {curso.Estado}</p>
            <h3 className="text-xl font-semibold mt-2">Estudiantes:</h3>
            <ul className="list-disc list-inside">
              {curso.Estudiantes.map((estudiante) => (
                <li key={estudiante.Codigo}>
                  {estudiante.Nombres} {estudiante.Apellidos}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cursos;
