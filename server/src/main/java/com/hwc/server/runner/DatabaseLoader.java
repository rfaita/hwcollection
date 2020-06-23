package com.hwc.server.runner;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hwc.server.model.Car;
import com.hwc.server.repository.CarRepository;
import com.hwc.server.repository.CarStatsRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class DatabaseLoader implements CommandLineRunner {

    private final CarRepository carRepository;
    private final CarStatsRepository carStatsRepository;
    private final ResourceLoader resourceLoader;

    @Override
    public void run(String... args) throws Exception {

        Resource resource = resourceLoader.getResource("classpath:database.json");

        ObjectMapper objectMapper = new ObjectMapper();

        List<Car> cars = objectMapper.readValue(resource.getInputStream(), new TypeReference<List<Car>>() {
        });

        carRepository.deleteAll();
        cars.forEach(car -> {

            car.setStats(carStatsRepository.findOneByCarId(car.getId()));

            carRepository.save(car);

        });


    }


}
