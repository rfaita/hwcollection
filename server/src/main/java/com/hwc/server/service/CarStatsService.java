package com.hwc.server.service;

import com.hwc.server.model.CarStats;
import com.hwc.server.repository.CarStatsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.HashSet;

@Service
@AllArgsConstructor
public class CarStatsService {

    private final CarStatsRepository carStatsRepository;

    public CarStats addFavorite(String carId, String userId) {

        CarStats carStats = carStatsRepository.findOneByCarId(carId);

        if (ObjectUtils.isEmpty(carStats)) {
            carStats = CarStats.builder()
                    .carId(carId)
                    .collections(new HashSet<>())
                    .favoriteds(new HashSet<>())
                    .build();
        }

        if (carStats.getFavoriteds().add(userId)) {
            return carStatsRepository.save(carStats);
        }

        return null;

    }

    public CarStats removeFavorite(String carId, String userId) {

        CarStats carStats = carStatsRepository.findOneByCarId(carId);

        if (ObjectUtils.isEmpty(carStats)) {
            carStats = CarStats.builder()
                    .carId(carId)
                    .collections(new HashSet<>())
                    .favoriteds(new HashSet<>())
                    .build();
        }

        if (carStats.getFavoriteds().remove(userId)) {
            return carStatsRepository.save(carStats);
        }

        return null;

    }

    public CarStats addCollection(String carId, String userId) {

        CarStats carStats = carStatsRepository.findOneByCarId(carId);

        if (ObjectUtils.isEmpty(carStats)) {
            carStats = CarStats.builder()
                    .carId(carId)
                    .collections(new HashSet<>())
                    .favoriteds(new HashSet<>())
                    .build();
        }

        if (carStats.getCollections().add(userId)) {
            return carStatsRepository.save(carStats);
        }

        return null;

    }

    public CarStats removeCollection(String carId, String userId) {

        CarStats carStats = carStatsRepository.findOneByCarId(carId);

        if (ObjectUtils.isEmpty(carStats)) {
            carStats = CarStats.builder()
                    .carId(carId)
                    .collections(new HashSet<>())
                    .favoriteds(new HashSet<>())
                    .build();
        }

        if (carStats.getCollections().remove(userId)) {
            return carStatsRepository.save(carStats);
        }

        return null;

    }
}
