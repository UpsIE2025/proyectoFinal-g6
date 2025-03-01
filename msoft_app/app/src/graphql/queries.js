import { gql } from '@apollo/client';

export const GET_CURSOS = gql`
  query GetCursos {
    cursos {
      ID
      Estado
      Nombre
    }
  }
`;

export const GET_ESTUDIANTES = gql`
  query GetEstudiantes {
    estudiantes {
      ID
      Estado
      Nombre
      Apellido
      Direccion
    }
  }
`;

export const GET_ESTUDIANTE = gql`
  query GetEstudiante($ID: ID!) {
    estudiante(ID: $ID) {
      ID
      Estado
      Nombre
      Apellido
      Direccion
    }
  }
`;

export const GET_CURSO = gql`
  query GetCurso($ID: ID!) {
    curso(ID: $ID) {
      ID
      Estado
      Nombre
      Estudiantes {
        ID
        Nombre
        Apellido
      }
    }
  }
`;

export const GET_CURSOS_POR_ESTUDIANTE = gql`
  query GetCursosPorEstudiante($ID_Estudiante: ID!) {
    cursosPorEstudiante(ID_Estudiante: $ID_Estudiante) {
      ID
      Estado
      Nombre
    }
  }
`;

export const GET_ESTUDIANTES_POR_CURSO = gql`
  query GetEstudiantesPorCurso($ID_Curso: ID!) {
    estudiantesPorCurso(ID_Curso: $ID_Curso) {
      ID
      Nombre
      Apellido
    }
  }
`;
