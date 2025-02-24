const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "database",
  database: "postgres",
  password: "password",
  port: 5432,
});

const resolvers = {
  Query: {
    estudiante: async (_, { Codigo }) => {
      const query = "SELECT * FROM Estudiante WHERE Codigo = $1";
      const { rows } = await pool.query(query, [Codigo]);
      return rows[0];
    },
    estudiantes: async () => {
      const query = "SELECT * FROM Estudiante";
      const { rows } = await pool.query(query);
      return rows;
    },
    curso: async (_, { Codigo }) => {
      const query = "SELECT * FROM Cursos WHERE Codigo = $1";
      const { rows } = await pool.query(query, [Codigo]);
      return rows[0];
    },
    cursos: async () => {
      const query = "SELECT * FROM Cursos";
      const { rows } = await pool.query(query);
      return rows;
    },
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
