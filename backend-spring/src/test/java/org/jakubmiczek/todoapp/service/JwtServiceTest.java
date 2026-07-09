package org.jakubmiczek.todoapp.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Collections;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class JwtServiceTest {

    private JwtService jwtService;
    private UserDetails user;

    @BeforeEach
    public void setUp() {
        jwtService = new JwtService();

        String testSecret = "dGhyb3duZGVwdGh1cG9uaGF2aW5nc3RvbWFjaHNwZWNpZXNvcmlnaW5hbGZpeGlsbHM=";

        ReflectionTestUtils.setField(jwtService, "secret", testSecret);
        ReflectionTestUtils.setField(jwtService, "expiration", 3600000L);

        jwtService.init();

        user = User.builder()
                .username("username")
                .password("password")
                .authorities(Collections.emptyList())
                .build();
    }

    @Test
    void shouldGenerateAndExtractToken() {
        String token = jwtService.generateToken(user);
        String username = jwtService.extractUsername(token);

        assertThat(username).isEqualTo(user.getUsername());
    }

    @Test
    void shouldValidateCorrectToken() {
        String token = jwtService.generateToken(user);

        assertThat(jwtService.validateToken(token, user)).isTrue();
    }

    @Test
    void shouldFailValidationWhenUsernameDoesNotMatch() {
        UserDetails invalidUser = User.builder()
                .username("invalidUser")
                .password("password")
                .authorities(Collections.emptyList())
                .build();

        String token = jwtService.generateToken(user);

        assertThat(jwtService.validateToken(token, invalidUser)).isFalse();
    }
}
