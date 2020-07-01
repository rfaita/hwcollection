package com.hwc.server.service;

import com.hwc.server.dto.UserDTO;
import com.hwc.server.model.Trade;
import com.hwc.server.model.User;
import com.hwc.server.repository.TradeRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.validation.ValidationException;

@Service
@AllArgsConstructor
public class TradeService {

    private final TradeRepository tradeRepository;
    private final UserService userService;
    private final CarService carService;

    public Page<Trade> findAllByCarId(String carId, int page, int size) {
        return tradeRepository.findAllByCarId(carId, PageRequest.of(page, size, Sort.by("createdAt").descending()));
    }

    public Page<Trade> findAllByUserId(String userId, int page, int size) {
        return tradeRepository.findAllByUserId(userId, PageRequest.of(page, size, Sort.by("createdAt").descending()));
    }

    public Trade create(Trade trade, UserDTO userDto) {

        User user = userService.getUser(userDto.getUid(), userDto.getEmail());

        trade.setUserId(user.getUid());
        trade.setUser(user);
        trade.setCar(carService.findById(trade.getCarId()));

        if (ObjectUtils.isEmpty(trade.getCar())) {
            throw new ValidationException("Car not found.");
        }

        return tradeRepository.save(trade);
    }

}
