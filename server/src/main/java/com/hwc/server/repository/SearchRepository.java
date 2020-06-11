package com.hwc.server.repository;

import com.hwc.server.model.Search;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchRepository extends MongoRepository<Search, String> {

    List<Search> findAllBy(Pageable pageable);

}
