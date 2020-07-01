package com.hwc.server.component;

import com.google.firebase.auth.FirebaseToken;
import com.hwc.server.dto.UserDTO;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityHelper {

    private FirebaseToken getToken() {

        UsernamePasswordAuthenticationToken auth
                = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        return  (FirebaseToken) auth.getPrincipal();

    }

    public UserDTO getUser() {
        return UserDTO.builder()
                .email(getEmail())
                .uid(getUserId())
                .build();
    }

    public String getUserId() {
        return getToken().getUid();
    }

    public String getEmail() {
        return getToken().getEmail();
    }

}
