package org.jakubmiczek.nodenotes.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jakubmiczek.nodenotes.controller.dto.UserRequest;
import org.jakubmiczek.nodenotes.service.JwtService;
import org.jakubmiczek.nodenotes.service.UserDetailsServiceImpl;
import org.jakubmiczek.nodenotes.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<Void> registerUser(@Valid @RequestBody UserRequest userRequest) {
        userService.addUser(userRequest);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@Valid @RequestBody UserRequest userRequest, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken token =  new UsernamePasswordAuthenticationToken(userRequest.username(), userRequest.password());

        if(authenticationManager.authenticate(token).isAuthenticated()) {
            UserDetails user = userDetailsService.loadUserByUsername(userRequest.username());

            Cookie cookie = new Cookie("jwt_token", jwtService.generateToken(user));
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            //cookie.setSecure(true);
            cookie.setMaxAge(24*60*60);

            response.addCookie(cookie);

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {

        Cookie cookie = new Cookie("jwt_token", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);

        return ResponseEntity.ok().build();
    }
}
