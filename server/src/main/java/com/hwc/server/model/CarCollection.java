package com.hwc.server.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@Builder
public class CarCollection {

    @Id
    private String id;
    @Indexed
    private String userId;
    @Indexed
    private String carId;
    @DBRef
    private Car car;

}
