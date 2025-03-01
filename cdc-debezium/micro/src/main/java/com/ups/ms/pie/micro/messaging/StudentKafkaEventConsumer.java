package com.ups.ms.pie.micro.messaging;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ups.ms.pie.micro.entity.Student;
import com.ups.ms.pie.micro.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import com.ups.ms.pie.micro.dto.DebeziumEventDto;
import org.springframework.kafka.annotation.KafkaListener;

@Slf4j
@RequiredArgsConstructor
@Component
public class StudentKafkaEventConsumer {

    private final StudentRepository studentRepository;

    @KafkaListener(topics = "pg-changes.public.estudiante", groupId = "my-group-micro")
    public void listen(String message) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            DebeziumEventDto  eventDto  = objectMapper.readValue(message, DebeziumEventDto.class);
            final var payload = eventDto.getPayload();
            final var source = payload.getSource();
            Student student = Student.builder()
                    .id((payload.getAfter().get("id") instanceof Integer)? ((Integer)payload.getAfter().get("id")).longValue():null)
                    .nombre(String.valueOf(payload.getAfter().get("nombre")))
                    .apellido(String.valueOf(payload.getAfter().get("apellido")))
                    .direccion(String.valueOf(payload.getAfter().get("direccion")))
                    .estado(Boolean.valueOf(String.valueOf(payload.getAfter().get("estado"))))
                    .build();
            studentRepository.save(student);
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
