package com.hwc.server.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.charset.Charset;

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
                InputStream inputStream = null;
                if (serviceAccount.contains(".json")) {
                    inputStream = new FileInputStream(serviceAccount);
                } else {
                    inputStream = new ByteArrayInputStream(serviceAccount.getBytes(Charset.forName("UTF-8")));
                }

                try {
                    FirebaseOptions options =
                            new FirebaseOptions.Builder()
                                    .setCredentials(GoogleCredentials.fromStream(inputStream))
                                    .setDatabaseUrl(databaseURL)
                                    .build();

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
