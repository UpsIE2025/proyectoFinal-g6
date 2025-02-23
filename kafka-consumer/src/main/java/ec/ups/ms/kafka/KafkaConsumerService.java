package ec.ups.ms.kafka;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
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

    @KafkaListener(topics = "query", groupId = "test-group")
    public void listen(ConsumerRecord<String, String> record) {
        System.out.println("Mensaje recibido de Kafka: " + record.value());
        saveToFirebase(record.value());
    }

    private void saveToFirebase(String message) {
        Firestore db = FirestoreClient.getFirestore();
        Map<String, Object> data = new HashMap<>();
        data.put("mensaje", message);
        data.put("timestamp", System.currentTimeMillis());

        ApiFuture<DocumentReference> future = db.collection("mensajes").add(data);

        // Crear un executor para manejar el callback
        Executor executor = Executors.newSingleThreadExecutor();
        future.addListener(() -> {
            try {
                DocumentReference docRef = future.get();
                System.out.println("✅ Mensaje guardado en Firebase con ID: " + docRef.getId());
            } catch (Exception e) {
                System.err.println("❌ Error guardando en Firebase: " + e.getMessage());
            }
        }, executor);
    }

}
