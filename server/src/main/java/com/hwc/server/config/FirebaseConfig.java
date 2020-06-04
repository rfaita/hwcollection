package com.hwc.server.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix = "firebase")
@Slf4j
public class FirebaseConfig {

    private String databaseURL;
    private String serviceAccount;


    @PostConstruct
    public void init() {

        try {
            FirebaseApp.getInstance();
        } catch (IllegalStateException e) {
            try {
                InputStream inputStream = new FileInputStream(serviceAccount);

                try {
                    FirebaseOptions options = new FirebaseOptions.Builder().setCredentials(GoogleCredentials.fromStream(inputStream))
                            .setDatabaseUrl(databaseURL).build();

                    FirebaseApp.initializeApp(options);
                } catch (Exception exception) {
                    log.error(exception.getMessage(), exception);
                }
            } catch (Exception exception) {
                log.error(exception.getMessage(), exception);
            }
        }

    }

    public String getDatabaseURL() {
        return databaseURL;
    }

    public void setDatabaseURL(String databaseURL) {
        this.databaseURL = databaseURL;
    }

    public String getServiceAccount() {
        return serviceAccount;
    }

    public void setServiceAccount(String serviceAccount) {
        this.serviceAccount = serviceAccount;
    }
}
