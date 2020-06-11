package com.hwc.server.service;

import com.hwc.server.model.Car;
import com.hwc.server.model.CarFavorite;
import com.hwc.server.model.CarStats;
import com.hwc.server.repository.CarFavoriteRepository;
import com.hwc.server.repository.CarRepository;
import com.hwc.server.repository.CarStatsRepository;
import io.netty.util.internal.ObjectUtil;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CarFavoriteService {

    private final CarRepository carRepository;
    private final CarFavoriteRepository carFavoriteRepository;
    private final CarStatsService carStatsService;

    public Optional<CarFavorite> favorite(String userId, String carId) {

        Optional<Car> car = carRepository.findById(carId);

        if (car.isPresent()) {

            Car carData = car.get();

            CarStats carStats = carStatsService.addFavorite(carData.getId(), userId);

            if (!ObjectUtils.isEmpty(carStats)) {

                if (ObjectUtils.isEmpty(carData.getStats())) {
                    carData.setStats(carStats);
                    carRepository.save(carData);
                }

                return Optional.of(carFavoriteRepository.save(CarFavorite.builder()
                        .car(carData)
                        .carId(carData.getId())
                        .userId(userId)
                        .build()));
            }
        }
        return Optional.empty();

    }

    public void removeFavorite(String userId, String carId) {

        Optional<CarFavorite> carFavorite = carFavoriteRepository.findOneByCarId(carId);

        if (carFavorite.isPresent()) {

            Optional<Car> car = carRepository.findById(carId);

            if (car.isPresent()) {

                Car carData = car.get();

                CarStats carStats = carStatsService.removeFavorite(carData.getId(), userId);

                if (!ObjectUtils.isEmpty(carStats)) {
                    carFavoriteRepository.deleteById(carFavorite.get().getId());
                }

            }
        }

    }


    public Page<CarFavorite> findAllByUserId(String userId, int page, int size) {
        return carFavoriteRepository.findAllByUserId(userId, PageRequest.of(page, size));
    }
}
