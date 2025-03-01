package com.ups.ms.pie.micro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ups.ms.pie.micro.entity.Course;

@Repository
public interface CourseRepository  extends JpaRepository<Course, Long> {

}

