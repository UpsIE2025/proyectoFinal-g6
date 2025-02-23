package ec.ups.ms.kafka.service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import ec.ups.ms.kafka.entities.Estudiante;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@Service
public class KafkaConsumerService {

    private final String collectionName = "estudiantes";

    @KafkaListener(topics = "estudiantes", groupId = "test-group")
    public void listen(ConsumerRecord<String, Estudiante> record) {
        saveToFirebase(record.value());
    }


    private void saveToFirebase(Estudiante estudiante) {
        Firestore db = FirestoreClient.getFirestore();
        Map<String, Object> data = new HashMap<>();
        data.put("estudiante", estudiante);
        data.put("timestamp", System.currentTimeMillis());
        ApiFuture<DocumentReference> future = db.collection(collectionName).add(data);
        Executor executor = Executors.newSingleThreadExecutor();
        future.addListener(() -> {
            try {
                DocumentReference docRef = future.get();
                System.out.println("Mensaje guardado en Firebase con ID: " + docRef.getId());
            } catch (Exception e) {
                System.err.println("Error guardando en Firebase: " + e.getMessage());
            }
        }, executor);
    }
}
