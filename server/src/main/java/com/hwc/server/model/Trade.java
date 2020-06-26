package com.hwc.server.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
@Data
@Builder
public class Trade {

    @Id
    private String id;
    private String title;
    private LocalDateTime createdAt;
    private TradeType type;

    @Indexed
    private String userId;
    @DBRef
    private User user;

    @Indexed
    private String carId;
    @DBRef
    private Car car;
}
