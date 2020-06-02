package com.hwc.server.runner;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hwc.server.model.Car;
import com.hwc.server.repository.CarRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.util.List;

@Component
@AllArgsConstructor
public class DatabaseLoader implements CommandLineRunner {

    private final CarRepository carRepository;

    @Override
    public void run(String... args) throws Exception {

        File file = ResourceUtils.getFile("classpath:database.json");

        ObjectMapper objectMapper = new ObjectMapper();

        List<Car> cars = objectMapper.readValue(file, new TypeReference<List<Car>>() {
        });

        carRepository.deleteAll();

        cars.forEach(car -> {
            car.setId((car.getName() + car.getYear() + car.getSeries() + car.getKey() + car.getWheelType()).replaceAll(" ", ""));
            car.setPhoto(car.getPhoto().replaceAll("\\/(\\d+)\\?cb\\=", "/350?cb="));
            if (car.getPhoto() != null && car.getPhoto().contains("Image_Not_Available")) {
                car.setPhoto("");
            }

        });

        carRepository.saveAll(cars);

    }
}
