const { Pool } = require("pg");

const pool = new Pool({
  user: "admindatabase",
  host: "209.94.59.49",
  database: "mydatabase",
  password: "admindatabase",
  port: 5432,
});

const resolvers = {
  Query: {
    // Obtener un estudiante por su código
    estudiante: async (_, { Codigo }) => {
      const query = "SELECT * FROM Estudiante WHERE Codigo = $1";
      const { rows } = await pool.query(query, [Codigo]);
      return rows[0];
    },

    // Obtener todos los estudiantes
    estudiantes: async () => {
      const query = "SELECT * FROM Estudiante";
      const { rows } = await pool.query(query);
      return rows;
    },

    // Obtener un curso por su código
    curso: async (_, { Codigo }) => {
      const query = "SELECT * FROM Cursos WHERE Codigo = $1";
      const { rows } = await pool.query(query, [Codigo]);
      return rows[0];
    },

    // Obtener todos los cursos
    cursos: async () => {
      const query = "SELECT * FROM Cursos";
      const { rows } = await pool.query(query);
      return rows;
    },

    // Obtener los cursos de un estudiante
    cursosPorEstudiante: async (_, { Codigo_Estudiante }) => {
      const query = `
        SELECT c.* 
        FROM Cursos c
        JOIN Estudiante_Curso ec ON c.Codigo = ec.Codigo_Curso
        WHERE ec.Codigo_Estudiante = $1
      `;
      const { rows } = await pool.query(query, [Codigo_Estudiante]);
      return rows;
    },

    // Obtener los estudiantes de un curso
    estudiantesPorCurso: async (_, { Codigo_Curso }) => {
      const query = `
        SELECT e.* 
        FROM Estudiante e
        JOIN Estudiante_Curso ec ON e.Codigo = ec.Codigo_Estudiante
        WHERE ec.Codigo_Curso = $1
      `;
      const { rows } = await pool.query(query, [Codigo_Curso]);
      return rows;
    },
  },

  Mutation: {
    // Crear un nuevo estudiante
    crearEstudiante: async (_, { Estado, Nombres, Apellidos, Direccion }) => {
      const query = `
        INSERT INTO Estudiante (Estado, Nombres, Apellidos, Direccion)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        Estado,
        Nombres,
        Apellidos,
        Direccion,
      ]);
      return rows[0];
    },

    // Actualizar un estudiante existente
    actualizarEstudiante: async (
      _,
      { Codigo, Estado, Nombres, Apellidos, Direccion }
    ) => {
      const query = `
        UPDATE Estudiante
        SET Estado = $1, Nombres = $2, Apellidos = $3, Direccion = $4
        WHERE Codigo = $5
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        Estado,
        Nombres,
        Apellidos,
        Direccion,
        Codigo,
      ]);
      return rows[0];
    },

    // Eliminar un estudiante
    eliminarEstudiante: async (_, { Codigo }) => {
      const query = "DELETE FROM Estudiante WHERE Codigo = $1 RETURNING *";
      const { rows } = await pool.query(query, [Codigo]);
      return rows[0];
    },

    // Crear un nuevo curso
    crearCurso: async (_, { Estado, Nombre }) => {
      const query = `
        INSERT INTO Cursos (Estado, Nombre)
        VALUES ($1, $2)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [Estado, Nombre]);
      return rows[0];
    },

    // Actualizar un curso existente
    actualizarCurso: async (_, { Codigo, Estado, Nombre }) => {
      const query = `
        UPDATE Cursos
        SET Estado = $1, Nombre = $2
        WHERE Codigo = $3
        RETURNING *
      `;
      const { rows } = await pool.query(query, [Estado, Nombre, Codigo]);
      return rows[0];
    },

    // Eliminar un curso
    eliminarCurso: async (_, { Codigo }) => {
      const query = "DELETE FROM Cursos WHERE Codigo = $1 RETURNING *";
      const { rows } = await pool.query(query, [Codigo]);
      return rows[0];
    },

    // Matricular un estudiante en un curso
    matricularEstudiante: async (_, { Codigo_Estudiante, Codigo_Curso }) => {
      const query = `
        INSERT INTO Estudiante_Curso (Codigo_Estudiante, Codigo_Curso)
        VALUES ($1, $2)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        Codigo_Estudiante,
        Codigo_Curso,
      ]);
      return rows[0];
    },

    // Desmatricular un estudiante de un curso
    desmatricularEstudiante: async (_, { Codigo_Estudiante, Codigo_Curso }) => {
      const query = `
        DELETE FROM Estudiante_Curso
        WHERE Codigo_Estudiante = $1 AND Codigo_Curso = $2
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        Codigo_Estudiante,
        Codigo_Curso,
      ]);
      return rows[0];
    },
  },

  // Resolvers para relaciones
  Estudiante: {
    Cursos: async (parent) => {
      const query = `
        SELECT c.* 
        FROM Cursos c
        JOIN Estudiante_Curso ec ON c.Codigo = ec.Codigo_Curso
        WHERE ec.Codigo_Estudiante = $1
      `;
      const { rows } = await pool.query(query, [parent.Codigo]);
      return rows;
    },
  },

  Curso: {
    Estudiantes: async (parent) => {
      const query = `
        SELECT e.* 
        FROM Estudiante e
        JOIN Estudiante_Curso ec ON e.Codigo = ec.Codigo_Estudiante
        WHERE ec.Codigo_Curso = $1
      `;
      const { rows } = await pool.query(query, [parent.Codigo]);
      return rows;
    },
  },
};

module.exports = resolvers;
