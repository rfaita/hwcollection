package com.hwc.server.repository;

import com.hwc.server.model.CarStats;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarStatsRepository extends MongoRepository<CarStats, String> {

    CarStats findOneByCarId(String carId);

}
