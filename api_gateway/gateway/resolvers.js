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
    // Obtener un estudiante por su ID
    estudiante: async (_, { ID }) => {
      const query = "SELECT * FROM Estudiante WHERE ID = $1";
      const { rows } = await pool.query(query, [ID]);
      const estudiante = rows[0];
      return {
        ID: estudiante.id,
        Estado: estudiante.estado,
        Nombre: estudiante.nombre,
        Apellido: estudiante.apellido,
        Direccion: estudiante.direccion,
      };
    },

    // Obtener todos los estudiantes
    estudiantes: async () => {
      const query = "SELECT * FROM Estudiante";
      const { rows } = await pool.query(query);
      return rows.map(estudiante => ({
        ID: estudiante.id,
        Estado: estudiante.estado,
        Nombre: estudiante.nombre,
        Apellido: estudiante.apellido,
        Direccion: estudiante.direccion,
      }));
    },

    // Obtener un curso por su ID
    curso: async (_, { ID }) => {
      const query = "SELECT * FROM Curso WHERE ID = $1";
      const { rows } = await pool.query(query, [ID]);
      const curso = rows[0];
      return {
        ID: curso.id,
        Estado: curso.estado,
        Nombre: curso.nombre,
      };
    },

    // Obtener todos los cursos
    cursos: async () => {
      const query = "SELECT * FROM Curso";
      const { rows } = await pool.query(query);
      return rows.map(curso => ({
        ID: curso.id,
        Estado: curso.estado,
        Nombre: curso.nombre,
      }));
    },

    // Obtener los cursos de un estudiante
    cursosPorEstudiante: async (_, { ID_Estudiante }) => {
      const query = `
        SELECT c.* 
        FROM Curso c
        JOIN Estudiante_Curso ec ON c.ID = ec."cursoId" 
        WHERE ec."estudianteId" = $1
      `;
      const { rows } = await pool.query(query, [ID_Estudiante]);
      return rows.map(curso => ({
        ID: curso.id,
        Estado: curso.estado,
        Nombre: curso.nombre,
      }));
    },

    // Obtener los estudiantes de un curso
    estudiantesPorCurso: async (_, { ID_Curso }) => {
      const query = `
        SELECT e.* 
        FROM Estudiante e
        JOIN Estudiante_Curso ec ON e.ID = ec.estudianteId
        WHERE ec.cursoId = $1
      `;
      const { rows } = await pool.query(query, [ID_Curso]);
      return rows.map(estudiante => ({
        ID: estudiante.id,
        Estado: estudiante.estado,
        Nombre: estudiante.nombre,
        Apellido: estudiante.apellido,
        Direccion: estudiante.direccion,
      }));
    },
  },

  Mutation: {
    // Crear un nuevo estudiante
    crearEstudiante: async (_, { Estado, Nombre, Apellido, Direccion }) => {
      try {
        const query = `
        INSERT INTO Estudiante (Estado, Nombre, Apellido, Direccion)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
        const { rows } = await pool.query(query, [
          Estado,
          Nombre,
          Apellido,
          Direccion,
        ]);
        const estudiante = rows[0];
        return {
          ID: estudiante.id,
          Estado: estudiante.estado,
          Nombre: estudiante.nombre,
          Apellido: estudiante.apellido,
          Direccion: estudiante.direccion,
        };
      } catch (error) {
        console.error("Error creating student:", error);
        throw new Error("Failed to create student");
      }
    },

    // Actualizar un estudiante existente
    actualizarEstudiante: async (
      _,
      { ID, Estado, Nombre, Apellido, Direccion }
    ) => {
      const query = `
        UPDATE Estudiante
        SET Estado = $1, Nombre = $2, Apellido = $3, Direccion = $4
        WHERE ID = $5
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        Estado,
        Nombre,
        Apellido,
        Direccion,
        ID,
      ]);
      const estudiante = rows[0];
      return {
        ID: estudiante.id,
        Estado: estudiante.estado,
        Nombre: estudiante.nombre,
        Apellido: estudiante.apellido,
        Direccion: estudiante.direccion,
      };
    },

    // Eliminar un estudiante
    eliminarEstudiante: async (_, { ID }) => {
      const query = "DELETE FROM Estudiante WHERE ID = $1 RETURNING *";
      const { rows } = await pool.query(query, [ID]);
      const estudiante = rows[0];
      return {
        ID: estudiante.id,
        Estado: estudiante.estado,
        Nombre: estudiante.nombre,
        Apellido: estudiante.apellido,
        Direccion: estudiante.direccion,
      };
    },

    // Crear un nuevo curso
    crearCurso: async (_, { Estado, Nombre }) => {
      const query = `
        INSERT INTO Curso (Estado, Nombre)
        VALUES ($1, $2)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [Estado, Nombre]);
      const curso = rows[0];
      return {
        ID: curso.id,
        Estado: curso.estado,
        Nombre: curso.nombre,
      };
    },

    // Actualizar un curso existente
    actualizarCurso: async (_, { ID, Estado, Nombre }) => {
      const query = `
        UPDATE Curso
        SET Estado = $1, Nombre = $2
        WHERE ID = $3
        RETURNING *
      `;
      const { rows } = await pool.query(query, [Estado, Nombre, ID]);
      const curso = rows[0];
      return {
        ID: curso.id,
        Estado: curso.estado,
        Nombre: curso.nombre,
      };
    },

    // Eliminar un curso
    eliminarCurso: async (_, { ID }) => {
      const query = "DELETE FROM Curso WHERE ID = $1 RETURNING *";
      const { rows } = await pool.query(query, [ID]);
      const curso = rows[0];
      return {
        ID: curso.id,
        Estado: curso.estado,
        Nombre: curso.nombre,
      };
    },

    // Matricular un estudiante en un curso
    matricularEstudiante: async (_, { EstudianteID, CursoID }) => {
      console.log(EstudianteID, CursoID);
      const query = `
        INSERT INTO Estudiante_Curso ("estudianteId", "cursoId", estado)
        VALUES ($1, $2, true)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        EstudianteID,
        CursoID,
      ]);
      const estudianteCurso = rows[0];
      return {
        EstudianteID: estudianteCurso.estudianteId,
        CursoID: estudianteCurso.cursoId,
      };
    },

    // Desmatricular un estudiante de un curso
    desmatricularEstudiante: async (_, { EstudianteID, CursoID }) => {
      const query = `
        DELETE FROM Estudiante_Curso
        WHERE "estudianteId" = $1 AND "cursoId" = $2
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        EstudianteID,
        CursoID,
      ]);
      const estudianteCurso = rows[0];
      return null;
    },
  },

  // Resolvers para relaciones
  Estudiante: {
    Cursos: async (parent) => {
      const query = `
        SELECT c.* 
        FROM Curso c
        JOIN Estudiante_Curso ec ON c.ID = ec.cursoId
        WHERE ec.estudianteId = $1
      `;
      const { rows } = await pool.query(query, [parent.ID]);
      return rows.map(curso => ({
        ID: curso.id,
        Estado: curso.estado,
        Nombre: curso.nombre,
      }));
    },
  },

  Curso: {
    Estudiantes: async (parent) => {
      const query = `
        SELECT e.* 
        FROM Estudiante e
        JOIN Estudiante_Curso ec ON e.ID = ec.estudianteId
        WHERE ec.cursoId = $1
      `;
      const { rows } = await pool.query(query, [parent.ID]);
      return rows.map(estudiante => ({
        ID: estudiante.id,
        Estado: estudiante.estado,
        Nombre: estudiante.nombre,
        Apellido: estudiante.apellido,
        Direccion: estudiante.direccion,
      }));
    },
  },
};

module.exports = resolvers;