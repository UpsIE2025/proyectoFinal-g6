import { gql } from '@apollo/client';

export const GET_CURSOS = gql`
  query GetCursos {
    cursos {
      Codigo
      Estado
      Nombre
      Estudiantes {
        Codigo
        Nombres
        Apellidos
      }
    }
  }
`;
export const GET_ESTUDIANTES = gql`
  query GetEstudiantes {
    estudiantes {
      Codigo
      Estado
      Nombres
      Apellidos
      Direccion
      Cursos {
        Codigo
        Estado
        Nombre
      }
    }
  }
`;

// Define other queries and mutations here