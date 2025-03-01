package com.ups.ms.pie.micro.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@ToString
public class StudentCourse {

    @Id
    private Long id;

    private Long estudianteId;

    private Long cursoId;

    private Boolean estado;

}