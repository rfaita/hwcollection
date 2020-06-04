package com.hwc.server.controller;

import com.hwc.server.component.SecurityHelper;
import com.hwc.server.model.CarFavorite;
import com.hwc.server.service.CarFavoriteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favorite")
@AllArgsConstructor
public class CarFavoriteController {

    private final CarFavoriteService service;
    private final SecurityHelper securityHelper;

    @PostMapping("/{carId}")
    public CarFavorite favorite(@PathVariable String carId) {
        return service.favorite(securityHelper.getUserId(), carId).orElse(null);
    }

    @DeleteMapping("/{carId}")
    public void removeFavorite(@PathVariable String carId) {
        service.removeFavorite(securityHelper.getUserId(), carId);
    }


}
