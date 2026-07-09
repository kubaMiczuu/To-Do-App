package org.jakubmiczek.todoapp.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jakubmiczek.todoapp.controller.dto.UserRequest;
import org.jakubmiczek.todoapp.service.JwtService;
import org.jakubmiczek.todoapp.service.UserDetailsServiceImpl;
import org.jakubmiczek.todoapp.service.UserService;
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
@RequestMapping("/auth")
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
    public ResponseEntity<String> login(@Valid @RequestBody UserRequest userRequest) {
        UsernamePasswordAuthenticationToken token =  new UsernamePasswordAuthenticationToken(userRequest.username(), userRequest.password());

        if(authenticationManager.authenticate(token).isAuthenticated()) {
            UserDetails user = userDetailsService.loadUserByUsername(userRequest.username());

            return ResponseEntity.ok(jwtService.generateToken(user));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}
