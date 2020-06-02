package com.hwc.server.service;

import com.hwc.server.model.Car;
import com.hwc.server.repository.CarRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CarService {

    private final CarRepository carRepository;

    public Page<Car> findAllBy(String query, int page, int size) {

        TextCriteria criteria = TextCriteria.forDefaultLanguage().matchingAny(query);
        return carRepository.findAllBy(criteria, PageRequest.of(page, size));
    }

}
