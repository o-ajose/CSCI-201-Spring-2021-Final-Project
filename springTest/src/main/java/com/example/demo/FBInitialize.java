
/*package com.example.demo;

//import com.google.api.services.storage.model.Bucket;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import com.google.cloud.storage.Bucket;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;

@Service
public class FBInitialize {
    @PostConstruct
    public void initialize() {
        try {
            FileInputStream serviceAccount =
                    new FileInputStream("src/serviceaccount.json");
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    // .setDatabaseUrl("https://csci201finalproject-310216.firebaseio.com")
                    //.setStorageBucket("csci201finalproject-310216.appspot.com")
                    .build();

            Bucket bucket = StorageClient.getInstance().bucket();

            FirebaseApp.initializeApp(options);


        } catch (Exception e) {
            System.out.println("Error found in FirebaseInitialize: " + e.getMessage());
        }
    }
}
*/
package com.example.demo;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Service;
import com.google.firebase.cloud.StorageClient;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;

@Service
public class FBInitialize {
    @PostConstruct
    public void initialize() {
        try {
            FileInputStream serviceAccount =
                    new FileInputStream("C:\\Users\\ojuol\\CSCI-201-Spring-2021-Final-Project\\springTest\\src\\serviceaccount.json");
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    // .setDatabaseUrl("https://csci201finalproject-310216.firebaseio.com")
                    .setStorageBucket("csci201finalproject-310216.appspot.com")
                    .build();
            FirebaseApp.initializeApp(options);
        } catch (Exception e) {
            System.out.println("Error found in FirebaseInitialize: " + e.getMessage());
        }
    }
}