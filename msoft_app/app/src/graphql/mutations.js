import { gql } from '@apollo/client';

export const CREAR_ESTUDIANTE = gql`
  mutation CrearEstudiante($Estado: Boolean!, $Nombre: String!, $Apellido: String!, $Direccion: String!) {
    crearEstudiante(Estado: $Estado, Nombre: $Nombre, Apellido: $Apellido, Direccion: $Direccion) {
      ID
      Estado
      Nombre
      Apellido
      Direccion
    }
  }
`;

export const ACTUALIZAR_ESTUDIANTE = gql`
  mutation ActualizarEstudiante($ID: ID!, $Estado: Boolean, $Nombre: String, $Apellido: String, $Direccion: String) {
    actualizarEstudiante(ID: $ID, Estado: $Estado, Nombre: $Nombre, Apellido: $Apellido, Direccion: $Direccion) {
      ID
      Estado
      Nombre
      Apellido
      Direccion
    }
  }
`;

export const ELIMINAR_ESTUDIANTE = gql`
  mutation EliminarEstudiante($ID: ID!) {
    eliminarEstudiante(ID: $ID) {
      ID
      Estado
      Nombre
      Apellido
      Direccion
    }
  }
`;

export const CREAR_CURSO = gql`
  mutation CrearCurso($Estado: Boolean!, $Nombre: String!) {
    crearCurso(Estado: $Estado, Nombre: $Nombre) {
      ID
      Estado
      Nombre
    }
  }
`;

export const ACTUALIZAR_CURSO = gql`
  mutation ActualizarCurso($ID: ID!, $Estado: Boolean, $Nombre: String) {
    actualizarCurso(ID: $ID, Estado: $Estado, Nombre: $Nombre) {
      ID
      Estado
      Nombre
    }
  }
`;

export const ELIMINAR_CURSO = gql`
  mutation EliminarCurso($ID: ID!) {
    eliminarCurso(ID: $ID) {
      ID
      Estado
      Nombre
    }
  }
`;

export const MATRICULAR_ESTUDIANTE = gql`
  mutation MatricularEstudiante($EstudianteID: ID!, $CursoID: ID!) {
    matricularEstudiante(EstudianteID: $EstudianteID, CursoID: $CursoID) {
      ID
      EstudianteID
      CursoID
      Estado
    }
  }
`;

export const DESMATRICULAR_ESTUDIANTE = gql`
  mutation DesmatricularEstudiante($EstudianteID: ID!, $CursoID: ID!) {
    desmatricularEstudiante(EstudianteID: $EstudianteID, CursoID: $CursoID) {
      ID
      EstudianteID
      CursoID
      Estado
    }
  }
`;