package com.hwc.server.model;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Document
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Car {

    @Id
    private String id;
    @TextIndexed(weight = 10f)
    private String name;
    private String number;
    private String numberTotal;
    @TextIndexed(weight = 20f)
    private String year;
    @TextIndexed(weight = 15f)
    private String series;
    private String seriesNumber;
    private String seriesTotalNumber;
    private List<String> color;
    private List<String> baseColorType;
    @TextIndexed(weight = 5f)
    private String key;
    private String country;
    private String wheelType;
    private String tampo;
    private String photo;

    @DBRef
    private CarStats stats;

    private Map<String, Object> extraFields = new HashMap<>();

    @JsonAnyGetter
    public Map<String, Object> getExtraFields() {
        return extraFields;
    }

    @JsonAnySetter
    public void setExtraFields(String key, Object value) {
        this.extraFields.put(key, value);
    }
}
