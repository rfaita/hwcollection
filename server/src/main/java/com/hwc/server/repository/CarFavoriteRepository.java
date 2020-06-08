package com.hwc.server.repository;

import com.hwc.server.model.Car;
import com.hwc.server.model.CarFavorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarFavoriteRepository extends MongoRepository<CarFavorite, String> {

    Page<CarFavorite> findAllByUserId(String userId, Pageable pageable);

    Optional<CarFavorite> findOneByCarId(String carId);
}
