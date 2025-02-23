package ec.ups.ms.kafka;

import ec.ups.ms.kafka.entities.Estudiante;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/kafka")
public class KafkaController {

    private final KafkaProducerService producerService;
    private final String topic = "estudiantes";

    public KafkaController(KafkaProducerService producerService) {
        this.producerService = producerService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody Estudiante estudiante) {
        producerService.sendMessage(topic, estudiante);
        return ResponseEntity.ok("Mensaje enviado a Kafka con éxito.");
    }
}

