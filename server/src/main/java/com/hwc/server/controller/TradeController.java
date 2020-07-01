package com.hwc.server.controller;

import com.hwc.server.component.SecurityHelper;
import com.hwc.server.dto.CreateTrade;
import com.hwc.server.model.Trade;
import com.hwc.server.service.TradeService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/")
@AllArgsConstructor
public class TradeController {

    private final TradeService service;
    private final SecurityHelper securityHelper;


    @GetMapping("/public/trade/{cardId}")
    public Page<Trade> findAllByCarId(@PathVariable String cardId,
                                      @RequestParam("page") int page,
                                      @RequestParam("size") int size) {
        return service.findAllByCarId(cardId, page, size);
    }


    @GetMapping("/public/trade/byUserId/{userId}")
    public Page<Trade> findAllByUserId(@PathVariable String userId,
                                       @RequestParam("page") int page,
                                       @RequestParam("size") int size) {
        return service.findAllByUserId(userId, page, size);
    }

    @DeleteMapping("/trade/{tradeId}")
    public void cancel(@PathVariable String tradeId) {

        service.cancel(tradeId, securityHelper.getUserId());
    }

    @PostMapping("/trade")
    public Trade create(@RequestBody @Valid CreateTrade createTrade) {

        return service.create(createTrade.toTrade(), securityHelper.getUser());
    }


}
