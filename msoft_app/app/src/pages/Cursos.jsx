import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CURSOS } from "../graphql/queries";
import {
  CREAR_CURSO,
  ACTUALIZAR_CURSO,
  ELIMINAR_CURSO,
} from "../graphql/mutations";

const Cursos = () => {
  const { loading, error, data } = useQuery(GET_CURSOS);
  const [createCurso] = useMutation(CREAR_CURSO, {
    refetchQueries: [{ query: GET_CURSOS }],
  });
  const [updateCurso] = useMutation(ACTUALIZAR_CURSO, {
    refetchQueries: [{ query: GET_CURSOS }],
  });
  const [deleteCurso] = useMutation(ELIMINAR_CURSO, {
    refetchQueries: [{ query: GET_CURSOS }],
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCurso, setEditingCurso] = useState(null);
  const [formState, setFormState] = useState({
    Nombre: "",
    Estado: true,
  });

  const handleOpenModal = (curso) => {
    setEditingCurso(curso);
    setFormState({
      Nombre: curso ? curso.Nombre : "",
      Estado: curso ? curso.Estado : true,
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingCurso(null);
    setFormState({
      Nombre: "",
      Estado: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCurso) {
      await updateCurso({
        variables: {
          ID: editingCurso.ID,
          Nombre: formState.Nombre,
          Estado: formState.Estado,
        },
      });
    } else {
      await createCurso({
        variables: {
          Nombre: formState.Nombre,
          Estado: formState.Estado,
        },
      });
    }
    handleCloseModal();
  };

  const handleDelete = async (ID) => {
    await deleteCurso({ variables: { ID } });
  };

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Gestión de Cursos
      </h1>
      <div className="flex justify-end mb-4">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          onClick={() => handleOpenModal(null)}
        >
          Crear Curso
        </button>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.cursos.map((curso) => (
          <li
            key={curso.ID}
            className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {curso.Nombre}
            </h2>
            <p className="text-gray-600 mb-4">
              Estado:{" "}
              <span
                className={`px-2 py-1 text-white rounded-full ${
                  curso.Estado ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {curso.Estado ? "Activo" : "Inactivo"}
              </span>
            </p>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
                onClick={() => handleOpenModal(curso)}
              >
                Editar
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                onClick={() => handleDelete(curso.ID)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              {editingCurso ? "Editar Curso" : "Crear Curso"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={formState.Nombre}
                  onChange={(e) =>
                    setFormState({ ...formState, Nombre: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Estado
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={formState.Estado}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      Estado: e.target.value === "true",
                    })
                  }
                  required
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  {editingCurso ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cursos;
