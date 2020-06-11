package com.hwc.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Document
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarStats {

    @Id
    private String id;
    @Indexed
    private String carId;
    private Set<String> favoriteds = new HashSet<>();
    private Set<String> collections = new HashSet<>();

}
