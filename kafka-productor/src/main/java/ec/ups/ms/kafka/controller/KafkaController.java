package ec.ups.ms.kafka.controller;

import ec.ups.ms.kafka.service.KafkaProducerService;
import ec.ups.ms.kafka.entities.Estudiante;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/kafka")
public class KafkaController {

    private final KafkaProducerService producerService;
    private final String topic = "estudiantes";

    public KafkaController(KafkaProducerService producerService) {
        this.producerService = producerService;
    }

    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> sendMessage(@RequestBody Estudiante estudiante) {
        producerService.sendMessage(topic, estudiante);
        // Crear el JSON de respuesta
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Mensaje enviado a Kafka con éxito.");
        return ResponseEntity.ok(response);
    }
}

