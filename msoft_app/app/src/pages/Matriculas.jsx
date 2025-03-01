import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_CURSOS_POR_ESTUDIANTE,
  GET_CURSOS,
  GET_ESTUDIANTE,
} from "../graphql/queries";
import {
  MATRICULAR_ESTUDIANTE,
  DESMATRICULAR_ESTUDIANTE,
} from "../graphql/mutations";

const Matriculas = () => {
  const { ID_Estudiante } = useParams();
  const navigate = useNavigate();
  const [, setIsMatriculado] = useState(false); // Estado para controlar el re-renderizado

  const { loading, error, data } = useQuery(GET_CURSOS_POR_ESTUDIANTE, {
    variables: { ID_Estudiante },
  });

  const {
    loading: loadingCursos,
    error: errorCursos,
    data: dataCursos,
  } = useQuery(GET_CURSOS);

  const {
    loading: loadingEstudiante,
    error: errorEstudiante,
    data: dataEstudiante,
  } = useQuery(GET_ESTUDIANTE, {
    variables: { ID: ID_Estudiante },
  });

  const [matricularEstudiante] = useMutation(MATRICULAR_ESTUDIANTE, {
    refetchQueries: [
      { query: GET_CURSOS_POR_ESTUDIANTE, variables: { ID_Estudiante } },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => setIsMatriculado(true), // Actualizamos el estado cuando se complete la matrícula
  });

  const [desmatricularEstudiante] = useMutation(DESMATRICULAR_ESTUDIANTE, {
    refetchQueries: [
      { query: GET_CURSOS_POR_ESTUDIANTE, variables: { ID_Estudiante } },
    ],
    awaitRefetchQueries: true,
  });

  if (loading || loadingCursos || loadingEstudiante)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16"></div>
      </div>
    );

  if (error || errorCursos || errorEstudiante)
    return (
      <div className="text-center text-red-500">
        <p>
          Error:{" "}
          {error?.message || errorCursos?.message || errorEstudiante?.message}
        </p>
      </div>
    );

  const handleMatricular = async (CursoID) => {
    await matricularEstudiante({
      variables: { EstudianteID: ID_Estudiante, CursoID },
    });
    setIsMatriculado(true); // Activamos la bandera para forzar el re-renderizado
  };

  const handleDesmatricular = async (CursoID) => {
    await desmatricularEstudiante({
      variables: { EstudianteID: ID_Estudiante, CursoID },
    });
  };

  // Filtrar los cursos en los que el estudiante ya está matriculado
  const cursosDisponibles = dataCursos.cursos.filter(
    (curso) => !data.cursosPorEstudiante.some((c) => c.ID === curso.ID)
  );

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate(-1)} // Regresar a la página anterior
        className="mb-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        Regresar
      </button>

      <div className="mb-6 pt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Información del Estudiante
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6">
          <p>
            <strong>Nombre:</strong> {dataEstudiante.estudiante.Nombre}
          </p>
          <p>
            <strong>Apellido:</strong> {dataEstudiante.estudiante.Apellido}
          </p>
          <p>
            <strong>Dirección:</strong> {dataEstudiante.estudiante.Direccion}
          </p>
          <p>
            <strong>Estado:</strong>{" "}
            {dataEstudiante.estudiante.Estado ? "Activo" : "Inactivo"}
          </p>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Cursos Matriculados
        </h2>
        {data.cursosPorEstudiante.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.cursosPorEstudiante.map((curso) => (
              <li
                key={curso.ID}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <h3 className="text-xl font-bold text-blue-600">
                  {curso.Nombre}
                </h3>
                <p className="text-gray-600">
                  Estado: {curso.Estado ? "Activo" : "Inactivo"}
                </p>
                <button
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                  onClick={() => handleDesmatricular(curso.ID)}
                >
                  Desmatricular
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">
            No tienes cursos matriculados aún.
          </p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Matricular en un Nuevo Curso
        </h2>
        {cursosDisponibles.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cursosDisponibles.map((curso) => (
              <li
                key={curso.ID}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <h3 className="text-xl font-bold text-blue-600">
                  {curso.Nombre}
                </h3>
                <p className="text-gray-600">
                  Estado: {curso.Estado ? "Activo" : "Inactivo"}
                </p>
                <button
                  className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                  onClick={() => handleMatricular(curso.ID)}
                >
                  Matricular
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">
            No hay cursos disponibles para matricularse.
          </p>
        )}
      </div>
    </div>
  );
};

export default Matriculas;
