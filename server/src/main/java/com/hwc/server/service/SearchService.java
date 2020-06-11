package com.hwc.server.service;

import com.hwc.server.model.Search;
import com.hwc.server.repository.SearchRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SearchService {

    private final SearchRepository repository;

    public List<Search> findTop5Search() {

        return repository.findAllBy(PageRequest.of(0, 5, Sort.by(Sort.Order.desc("hits"))));
    }
}
