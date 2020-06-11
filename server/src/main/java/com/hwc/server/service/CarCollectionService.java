package com.hwc.server.service;

import com.hwc.server.model.Car;
import com.hwc.server.model.CarCollection;
import com.hwc.server.model.CarFavorite;
import com.hwc.server.model.CarStats;
import com.hwc.server.repository.CarCollectionRepository;
import com.hwc.server.repository.CarRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CarCollectionService {

    private final CarRepository carRepository;
    private final CarCollectionRepository carCollectionRepository;
    private final CarStatsService carStatsService;

    public Optional<CarCollection> addCollection(String userId, String carId) {

        Optional<Car> car = carRepository.findById(carId);

        if (car.isPresent()) {

            Car carData = car.get();

            CarStats carStats = carStatsService.addCollection(carData.getId(), userId);

            if (!ObjectUtils.isEmpty(carStats)) {

                if (ObjectUtils.isEmpty(carData.getStats())) {
                    carData.setStats(carStats);
                    carRepository.save(carData);
                }

                return Optional.of(carCollectionRepository.save(CarCollection.builder()
                        .car(carData)
                        .carId(carData.getId())
                        .userId(userId)
                        .build()));
            }
        }
        return Optional.empty();

    }

    public void removeCollection(String userId, String carId) {

        Optional<CarCollection> carCollection = carCollectionRepository.findOneByCarId(carId);

        if (carCollection.isPresent()) {

            Optional<Car> car = carRepository.findById(carId);

            if (car.isPresent()) {

                Car carData = car.get();

                CarStats carStats = carStatsService.removeCollection(carData.getId(), userId);

                if (!ObjectUtils.isEmpty(carStats)) {
                    carCollectionRepository.deleteById(carCollection.get().getId());
                }

            }
        }

    }

    public Page<CarCollection> findAllByUserId(String userId, int page, int size) {
        return carCollectionRepository.findAllByUserId(userId, PageRequest.of(page, size));
    }

}
