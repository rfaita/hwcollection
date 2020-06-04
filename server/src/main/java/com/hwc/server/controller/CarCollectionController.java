package com.hwc.server.controller;

import com.hwc.server.model.CarCollection;
import com.hwc.server.service.CarCollectionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/collection")
@AllArgsConstructor
public class CarCollectionController {

    private final CarCollectionService service;

    @PostMapping("/{carId}")
    public CarCollection addToCollection(@PathVariable String carId) {
        return service.addToCollection("123", carId).orElse(null);
    }

    @DeleteMapping("/{carId}")
    public void removeFromCollection(@PathVariable String carId) {
        service.removeFromCollection("123", carId);
    }

}
