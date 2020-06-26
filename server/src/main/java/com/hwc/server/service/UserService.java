package com.hwc.server.service;

import com.hwc.server.model.User;
import com.hwc.server.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getUser(String uid, String email) {

        Optional<User> user = userRepository.findById(uid);

        if (user.isPresent()) {
            return user.get();
        } else {
            return userRepository.save(User.builder()
                    .uid(uid)
                    .email(email)
                    .rank(0)
                    .build());
        }

    }
}
