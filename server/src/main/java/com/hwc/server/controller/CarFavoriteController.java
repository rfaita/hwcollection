package com.hwc.server.controller;

import com.hwc.server.model.CarFavorite;
import com.hwc.server.service.CarFavoriteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favorite")
@AllArgsConstructor
public class CarFavoriteController {

    private final CarFavoriteService service;

    @PostMapping("/{carId}")
    public CarFavorite favorite(@PathVariable String carId) {
        return service.favorite("123", carId).orElse(null);
    }

    @DeleteMapping("/{carId}")
    public void removeFavorite(@PathVariable String carId) {
        service.removeFavorite("123", carId);
    }


}
