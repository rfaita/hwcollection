package com.hwc.server.component;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@Component
public class FirebaseAuthenticationTokenFilter extends OncePerRequestFilter {

    private final static String TOKEN_HEADER = "Authorization";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {


        String authToken = request.getHeader(TOKEN_HEADER);

        if (StringUtils.isEmpty(authToken)) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            Authentication authentication = getAndValidateAuthentication(authToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (FirebaseAuthException ex) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }

        filterChain.doFilter(request, response);
    }

    private Authentication getAndValidateAuthentication(String authToken) throws FirebaseAuthException {
        Authentication authentication;

        String token = authToken.contains("Bearer ") ? authToken.split(" ")[1] : authToken;

        FirebaseToken firebaseToken = authenticateFirebaseToken(token);
        authentication = new UsernamePasswordAuthenticationToken(firebaseToken, token, new ArrayList<>());

        return authentication;
    }

    private FirebaseToken authenticateFirebaseToken(String authToken) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().verifyIdToken(authToken);
    }

}