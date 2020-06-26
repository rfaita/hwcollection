package com.hwc.server.dto;

import com.hwc.server.model.Trade;
import com.hwc.server.model.TradeType;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@Builder
public class CreateTrade {

    @NotBlank
    private String title;
    @NotNull
    private TradeType type;
    @NotBlank
    private String carId;


    public Trade toTrade() {
        return Trade.builder()
                .title(this.title)
                .type(this.type)
                .carId(this.carId)
                .createdAt(LocalDateTime.now())
                .build();

    }


}
