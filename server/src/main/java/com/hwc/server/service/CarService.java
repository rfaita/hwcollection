package com.hwc.server.service;

import com.hwc.server.model.Car;
import com.hwc.server.model.Search;
import com.hwc.server.repository.CarRepository;
import com.hwc.server.repository.SearchRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CarService {

    private final CarRepository carRepository;
    private final SearchRepository searchRepository;

    public Page<Car> findAllBy(String query, int page, int size) {

        TextCriteria criteria = TextCriteria.forDefaultLanguage().matchingPhrase(query);
        Page<Car> ret = carRepository.findAllBy(criteria,
                PageRequest.of(page, size, Sort.by(Sort.Order.desc("year"), Sort.Order.asc("name"))));

        if (ret.getTotalElements() > 0 && page == 0) {
            Optional<Search> search = searchRepository.findById(query.toLowerCase());

            Search saveSearch;
            if (search.isPresent()) {
                saveSearch = search.get();
                saveSearch.setHits(saveSearch.getHits() + 1);
                saveSearch.setUpdatedAt(LocalDateTime.now());
            } else {
                saveSearch = Search.builder()
                        .query(query.toLowerCase())
                        .updatedAt(LocalDateTime.now())
                        .hits(1l)
                        .build();
            }
            searchRepository.save(saveSearch);
        }

        return ret;
    }

}
