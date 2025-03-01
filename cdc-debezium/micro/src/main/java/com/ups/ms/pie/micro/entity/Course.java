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
public class Course {

    @Id
    private Long id;

    private String nombre;

    private Boolean estado;


}