package com.hwc.server.component;

import com.google.firebase.auth.FirebaseToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityHelper {

    public String getUserId() {

        UsernamePasswordAuthenticationToken auth
                = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        FirebaseToken firebaseToken = (FirebaseToken) auth.getPrincipal();

        return firebaseToken.getUid();

    }

}
