package com.hwc.server.repository;

import com.hwc.server.model.CarCollection;
import com.hwc.server.model.CarFavorite;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarCollectionRepository extends MongoRepository<CarCollection, String> {

    List<CarCollection> findAllByUserId(String userId);

    Optional<CarCollection> findOneByCarId(String carId);

}
