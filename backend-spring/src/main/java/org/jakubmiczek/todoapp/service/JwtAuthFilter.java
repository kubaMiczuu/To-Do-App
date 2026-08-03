package org.jakubmiczek.todoapp.service;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;

    public JwtAuthFilter(JwtService jwtService, UserDetailsServiceImpl userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        Cookie[] cookies = request.getCookies();

        String authorizationToken = null;

        if(cookies != null) {
            for (Cookie cookie : cookies) {
                if (Objects.equals(cookie.getName(), "jwt_token")) {
                    authorizationToken = cookie.getValue();
                    break;
                }
            }
        }

        if (authorizationToken != null) {
            String username = jwtService.extractUsername(authorizationToken);

            if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails user = userDetailsService.loadUserByUsername(username);

                if(jwtService.validateToken(authorizationToken, user)) {
                    SecurityContextHolder.getContext().setAuthentication(
                            new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities())
                    );
                }
            }


        }

        filterChain.doFilter(request, response);
    }
}
