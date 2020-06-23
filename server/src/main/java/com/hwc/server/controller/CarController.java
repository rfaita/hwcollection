package com.hwc.server.controller;

import com.hwc.server.model.Car;
import com.hwc.server.service.CarService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/car")
@AllArgsConstructor
public class CarController {

    private final CarService service;

    @GetMapping
    public Page<Car> findAllBy(@RequestParam("query") String query,
                               @RequestParam("page") int page,
                               @RequestParam("size") int size) {
        return service.findAllBy(query, page, size);
    }


}
