package com.hwc.server.runner;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hwc.server.model.Car;
import com.hwc.server.repository.CarRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@AllArgsConstructor
public class DatabaseLoader implements CommandLineRunner {

    private final CarRepository carRepository;
    private final ResourceLoader resourceLoader;

    private static final Map<String, String[]> countryMap = new HashMap<>();

    static {
        countryMap.put("Malaysia", new String[]{"malaysia", "malayxia", "malayisa", "malasyia", "malasya", "mayalsia", "malasysia", "malysia", "malayaia", "malasia", "maylasia", "malaysa"});
        countryMap.put("Indonesia", new String[]{"indonesia", "indoniesia", "indoneisa"});
        countryMap.put("Thailand", new String[]{"thailand", "thialand", "tahiland", "thaiand", "thailad"});
        countryMap.put("China", new String[]{"china"});
        countryMap.put("Hong-Kong", new String[]{"hon", "hk"});
        countryMap.put("USA", new String[]{"usa", "u.s.", "united"});
        countryMap.put("Mexico", new String[]{"mexico", "méxico"});
        countryMap.put("Canada", new String[]{"canada"});
        countryMap.put("France", new String[]{"france"});
        countryMap.put("Italy", new String[]{"italy"});
        countryMap.put("India", new String[]{"india"});
        countryMap.put("Vietnam", new String[]{"vietnam"});
    }

    private String getCountry(String country) {
        if (!StringUtils.isEmpty(country)) {
            for (String index : countryMap.keySet()) {
                for (String countryMapping : countryMap.get(index)) {
                    if (country.toLowerCase().indexOf(countryMapping) > -1) {
                        return index;
                    }
                }
            }
        }
        return "Malaysia";
    }

    @Override
    public void run(String... args) throws Exception {

        Resource resource = resourceLoader.getResource("classpath:database.json");

        ObjectMapper objectMapper = new ObjectMapper();

        List<Car> cars = objectMapper.readValue(resource.getInputStream(), new TypeReference<List<Car>>() {
        });

        //carRepository.deleteAll();


        cars.forEach(car -> {
            car.setId((car.getName() + car.getYear() + car.getSeries() + car.getKey() + car.getWheelType()).replaceAll(" ", ""));
            car.setPhoto(car.getPhoto().replaceAll("\\/(\\d+)\\?cb\\=", "/350?cb="));
            if (car.getPhoto() != null && car.getPhoto().contains("Image_Not_Available")) {
                car.setPhoto("");
            }
            car.setCountry(getCountry(car.getCountry()));

            carRepository.save(car);

        });



    }


}
