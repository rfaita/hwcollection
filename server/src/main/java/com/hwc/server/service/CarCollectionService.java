package com.hwc.server.service;

import com.hwc.server.model.Car;
import com.hwc.server.model.CarCollection;
import com.hwc.server.repository.CarCollectionRepository;
import com.hwc.server.repository.CarRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CarCollectionService {

    private final CarRepository carRepository;
    private final CarCollectionRepository carCollectionRepository;


    public Optional<CarCollection> addToCollection(String userId, String carId) {

        Optional<Car> car = carRepository.findById(carId);

        if (car.isPresent()) {

            Car carData = car.get();

            if (carData.getCollections().add(userId)) {

                carRepository.save(carData);

                return Optional.of(carCollectionRepository.save(CarCollection.builder()
                        .car(carData)
                        .carId(carData.getId())
                        .userId(userId)
                        .build()));

            }
        }
        return Optional.empty();

    }

    public void removeFromCollection(String userId, String carId) {

        Optional<CarCollection> carCollection = carCollectionRepository.findOneByCarId(carId);

        if (carCollection.isPresent()) {

            Optional<Car> car = carRepository.findById(carId);

            if (car.isPresent()) {

                Car carData = car.get();

                if (carData.getCollections().remove(userId)) {
                    carRepository.save(carData);
                }

                carCollectionRepository.deleteById(carCollection.get().getId());

            }
        }

    }

}
