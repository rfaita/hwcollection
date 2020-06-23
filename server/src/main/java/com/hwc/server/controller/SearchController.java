package com.hwc.server.controller;

import com.hwc.server.model.Search;
import com.hwc.server.service.SearchService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public/search")
@AllArgsConstructor
public class SearchController {

    private final SearchService service;

    @GetMapping("/top5")
    public List<Search> findTop5Search() {
        return service.findTop5Search();
    }

}
