package com.hwc.server.service;

import com.hwc.server.model.Car;
import com.hwc.server.model.CarFavorite;
import com.hwc.server.repository.CarFavoriteRepository;
import com.hwc.server.repository.CarRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CarFavoriteService {

    private final CarRepository carRepository;
    private final CarFavoriteRepository carFavoriteRepository;

    public Optional<CarFavorite> favorite(String userId, String carId) {

        Optional<Car> car = carRepository.findById(carId);

        if (car.isPresent()) {

            Car carData = car.get();

            if (carData.getFavoriteds().add(userId)) {

                carRepository.save(carData);

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

                if (carData.getFavoriteds().remove(userId)) {
                    carRepository.save(carData);
                }

                carFavoriteRepository.deleteById(carFavorite.get().getId());

            }
        }

    }
}
