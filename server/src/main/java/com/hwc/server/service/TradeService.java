package com.hwc.server.service;

import com.hwc.server.model.Trade;
import com.hwc.server.repository.TradeRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TradeService {

    private final TradeRepository tradeRepository;

    public Page<Trade> findAllByCarId(String carId, int page, int size) {
        return tradeRepository.findAllByCarId(carId, PageRequest.of(page, size, Sort.by("createdAt").descending()));
    }

    public Trade create(Trade trade) {

        return tradeRepository.save(trade);
    }

}
