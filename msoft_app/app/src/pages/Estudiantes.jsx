import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ESTUDIANTES } from "../graphql/queries";
import {
  CREAR_ESTUDIANTE,
  ACTUALIZAR_ESTUDIANTE,
  ELIMINAR_ESTUDIANTE,
} from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

const Estudiantes = () => {
  const { loading, error, data } = useQuery(GET_ESTUDIANTES);
  const [createEstudiante] = useMutation(CREAR_ESTUDIANTE, {
    refetchQueries: [{ query: GET_ESTUDIANTES }],
  });
  const [updateEstudiante] = useMutation(ACTUALIZAR_ESTUDIANTE, {
    refetchQueries: [{ query: GET_ESTUDIANTES }],
  });
  const [deleteEstudiante] = useMutation(ELIMINAR_ESTUDIANTE, {
    refetchQueries: [{ query: GET_ESTUDIANTES }],
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEstudiante, setEditingEstudiante] = useState(null);
  const [formState, setFormState] = useState({
    Nombre: "",
    Apellido: "",
    Direccion: "",
    Estado: true,
  });
  const navigate = useNavigate();

  const handleOpenModal = (estudiante) => {
    setEditingEstudiante(estudiante);
    setFormState({
      Nombre: estudiante ? estudiante.Nombre : "",
      Apellido: estudiante ? estudiante.Apellido : "",
      Direccion: estudiante ? estudiante.Direccion : "",
      Estado: estudiante ? estudiante.Estado : true,
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingEstudiante(null);
    setFormState({
      Nombre: "",
      Apellido: "",
      Direccion: "",
      Estado: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingEstudiante) {
      await updateEstudiante({
        variables: {
          ID: editingEstudiante.ID,
          Nombre: formState.Nombre,
          Apellido: formState.Apellido,
          Direccion: formState.Direccion,
          Estado: formState.Estado,
        },
      });
    } else {
      await createEstudiante({
        variables: {
          Nombre: formState.Nombre,
          Apellido: formState.Apellido,
          Direccion: formState.Direccion,
          Estado: formState.Estado,
        },
      });
    }
    handleCloseModal();
  };

  const handleDelete = async (ID) => {
    await deleteEstudiante({ variables: { ID } });
  };

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-end pt-10">
        <button
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
          onClick={() => handleOpenModal(null)}
        >
          Crear Estudiante
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full bg-white border-spacing-0">
          <thead className="bg-black text-white">
            <tr>
              <th className="py-3 px-4 text-left">Nombre</th>
              <th className="py-3 px-4 text-left">Apellido</th>
              <th className="py-3 px-4 text-left">Dirección</th>
              <th className="py-3 px-4 text-left">Estado</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.estudiantes.map((estudiante) => (
              <tr
                key={estudiante.ID}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="py-3 px-4">{estudiante.Nombre}</td>
                <td className="py-3 px-4">{estudiante.Apellido}</td>
                <td className="py-3 px-4">{estudiante.Direccion}</td>
                <td className="py-3 px-4">
                  {estudiante.Estado ? "Activo" : "Inactivo"}
                </td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
                    onClick={() => handleOpenModal(estudiante)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    onClick={() => handleDelete(estudiante.ID)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                    onClick={() => navigate(`/matriculas/${estudiante.ID}`)}
                  >
                    Cursos
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              {editingEstudiante ? "Editar Estudiante" : "Crear Estudiante"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formState.Nombre}
                  onChange={(e) =>
                    setFormState({ ...formState, Nombre: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Apellido</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formState.Apellido}
                  onChange={(e) =>
                    setFormState({ ...formState, Apellido: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Dirección</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formState.Direccion}
                  onChange={(e) =>
                    setFormState({ ...formState, Direccion: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Estado</label>
                <select
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200 mr-2"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                >
                  {editingEstudiante ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estudiantes;
