package ec.ups.ms.kafka.entities;

import lombok.Data;

@Data
public class Estudiante {

    private String codigo;
    private String estado;
    private String nombres;
    private String apellidos;
    private String direccion;

}
