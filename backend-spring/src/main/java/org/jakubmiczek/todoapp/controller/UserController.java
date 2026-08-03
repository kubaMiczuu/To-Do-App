package org.jakubmiczek.todoapp.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jakubmiczek.todoapp.controller.dto.UserPasswordUpdateRequest;
import org.jakubmiczek.todoapp.controller.dto.UserResponse;
import org.jakubmiczek.todoapp.controller.dto.UserInfoUpdateRequest;
import org.jakubmiczek.todoapp.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
class UserController {
    private final UserService userService;

    @PutMapping("/me")
    public ResponseEntity<Void> updateUserInfo(@Valid @RequestBody UserInfoUpdateRequest userUpdateRequest, Principal principal, HttpServletResponse response   ) {
        userService.updateUserInfo(principal.getName(), userUpdateRequest.username());

        Cookie cookie = new Cookie("jwt_token", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/me/password")
    public ResponseEntity<Void> updateUserPassword(@Valid @RequestBody UserPasswordUpdateRequest request, Principal principal, HttpServletResponse response) {
        userService.updatePassword(principal.getName(), request);

        Cookie cookie = new Cookie("jwt_token", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteUser(Principal principal) {
        String username = principal.getName();

        userService.deleteUser(username);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(Principal principal) {
        String username = principal.getName();

        UserResponse userResponse = userService.getUserProfile(username);

        return ResponseEntity.ok(userResponse);
    }
}
