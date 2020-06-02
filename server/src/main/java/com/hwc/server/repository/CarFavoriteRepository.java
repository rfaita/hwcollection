package com.hwc.server.repository;

import com.hwc.server.model.CarFavorite;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarFavoriteRepository extends MongoRepository<CarFavorite, String> {

    List<CarFavorite> findAllByUserId(String userId);

    Optional<CarFavorite> findOneByCarId(String carId);
}
