package com.hwc.server.repository;

import com.hwc.server.model.CarCollection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarCollectionRepository extends MongoRepository<CarCollection, String> {

    Optional<CarCollection> findOneByUserIdAndCarId(String userId, String carId);

    Page<CarCollection> findAllByUserId(String userId, Pageable pageable);

}
