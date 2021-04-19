package com.example.demo;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.slf4j.Logger;
import com.google.firebase.cloud.FirestoreClient;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.FileInputStream;

@SpringBootApplication
public class Application {

 //   @Autowired
   // FBInitialize initialize;

    private final static Logger logger = LoggerFactory.getLogger(Application.class);
    //@Autowired
   // private Firestore firestore;
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        /*
        try {
            FileInputStream serviceAccount =
                    new FileInputStream("src/serviceaccount.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);
        } catch (Exception e) {
            System.out.println("Error found in FirebaseInitialize: " + e.getMessage());
        }*/
    }
/*
    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {
            logger.info("{} app initialized.", firestore.getOptions().getProjectId());
        };
    }*/
}