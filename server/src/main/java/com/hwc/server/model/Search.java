package com.hwc.server.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
@Data
@Builder
public class Search {

    @Id
    private String query;
    private Long hits;
    @Indexed(expireAfterSeconds = 24*3600)
    private LocalDateTime updatedAt;
}
