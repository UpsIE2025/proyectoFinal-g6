package ec.ups.ms.kafka;

import ec.ups.ms.kafka.entities.Estudiante;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String, Estudiante> kafkaTemplate;

    public KafkaProducerService(KafkaTemplate<String, Estudiante> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMessage(String topic, Estudiante estudiante) {
        kafkaTemplate.send(topic, estudiante);
    }
}