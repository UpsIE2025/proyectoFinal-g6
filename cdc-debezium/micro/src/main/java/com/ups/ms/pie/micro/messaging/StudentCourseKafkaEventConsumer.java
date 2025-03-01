package com.ups.ms.pie.micro.messaging;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ups.ms.pie.micro.dto.DebeziumEventDto;
import com.ups.ms.pie.micro.entity.Student;
import com.ups.ms.pie.micro.entity.StudentCourse;
import com.ups.ms.pie.micro.repository.StudentCourseRepository;
import com.ups.ms.pie.micro.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class StudentCourseKafkaEventConsumer {

    private final StudentCourseRepository studentCourseRepository;

    @KafkaListener(topics = "pg-changes.public.estudiante_curso", groupId = "my-group-micro")
    public void listen(String message) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            DebeziumEventDto  eventDto  = objectMapper.readValue(message, DebeziumEventDto.class);
            final var payload = eventDto.getPayload();
            final var source = payload.getSource();
            StudentCourse studentCourse = StudentCourse.builder()
                    .id((payload.getAfter().get("id") instanceof Integer)? ((Integer)payload.getAfter().get("id")).longValue():null)
                    .estudianteId((payload.getAfter().get("estudianteId") instanceof Integer)? ((Integer)payload.getAfter().get("estudianteId")).longValue():null)
                    .cursoId((payload.getAfter().get("cursoId") instanceof Integer)? ((Integer)payload.getAfter().get("cursoId")).longValue():null)
                    .estado(Boolean.valueOf(String.valueOf(payload.getAfter().get("estado"))))
                    .build();
            studentCourseRepository.save(studentCourse);
            log.info("{} event on {} table message {}",
                    payload.getOperationType(),
                    source.getTable(),
                    payload.getAfter()
                    );

        } catch (Exception e) {
            log.error("Failed to processing consumed message {}", message, e);
        }
    }
}
