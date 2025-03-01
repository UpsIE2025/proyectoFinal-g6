import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CURSOS_POR_ESTUDIANTE, GET_CURSOS } from "../graphql/queries";
import {
  MATRICULAR_ESTUDIANTE,
  DESMATRICULAR_ESTUDIANTE,
} from "../graphql/mutations";

const Matriculas = () => {
  const { ID_Estudiante } = useParams();
  const { loading, error, data } = useQuery(GET_CURSOS_POR_ESTUDIANTE, {
    variables: { ID_Estudiante },
  });

  const {
    loading: loadingCursos,
    error: errorCursos,
    data: dataCursos,
  } = useQuery(GET_CURSOS);

  const [matricularEstudiante] = useMutation(MATRICULAR_ESTUDIANTE, {
    update(cache, { data: { matricularEstudiante } }) {
      const { cursosPorEstudiante } = cache.readQuery({
        query: GET_CURSOS_POR_ESTUDIANTE,
        variables: { ID_Estudiante },
      });
      cache.writeQuery({
        query: GET_CURSOS_POR_ESTUDIANTE,
        data: {
          cursosPorEstudiante: [...cursosPorEstudiante, matricularEstudiante],
        },
        variables: { ID_Estudiante },
      });
    },
  });

  const [desmatricularEstudiante] = useMutation(DESMATRICULAR_ESTUDIANTE, {
    refetchQueries: [
      { query: GET_CURSOS_POR_ESTUDIANTE, variables: { ID_Estudiante } },
    ],
    awaitRefetchQueries: true,
  });

  if (loading || loadingCursos)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16"></div>
      </div>
    );

  if (error || errorCursos)
    return (
      <div className="text-center text-red-500">
        <p>Error: {error?.message || errorCursos?.message}</p>
      </div>
    );

  const handleMatricular = async (CursoID) => {
    await matricularEstudiante({
      variables: { EstudianteID: ID_Estudiante, CursoID },
    });
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
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-10">
        Gestión de Matrículas
      </h1>

      <div className="mb-6">
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
