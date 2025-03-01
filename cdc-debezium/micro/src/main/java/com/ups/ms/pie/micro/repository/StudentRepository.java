package com.ups.ms.pie.micro.repository;

import com.ups.ms.pie.micro.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends  JpaRepository<Student, Long> {

}