package com.hwc.server.repository;

import com.hwc.server.model.Trade;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TradeRepository extends MongoRepository<Trade, String> {

    Page<Trade> findAllByCarId(String carId, Pageable pageable);

    Page<Trade> findAllByUserId(String carId, Pageable pageable);


}
