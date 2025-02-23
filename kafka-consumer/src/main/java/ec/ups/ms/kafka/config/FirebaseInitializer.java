package ec.ups.ms.kafka.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.util.logging.Level;
import java.util.logging.Logger;

import java.io.IOException;

@Service
public class FirebaseInitializer {

    public FirebaseInitializer() {
        Logger.getLogger("com.google").setLevel(Level.ALL);
        try {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(new ClassPathResource("firebase-config.json").getInputStream()))
                    .build();
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                System.out.println("Firebase inicializado correctamente.");
            } else {
                System.out.println("Firebase ya estaba inicializado.");
            }
            System.out.println("Firebase inicializado correctamente.");
        } catch (IOException e) {
            throw new RuntimeException("Error al inicializar Firebase", e);
        }
    }
}