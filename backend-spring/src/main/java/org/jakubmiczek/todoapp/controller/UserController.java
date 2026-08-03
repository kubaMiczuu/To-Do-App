package org.jakubmiczek.todoapp.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jakubmiczek.todoapp.controller.dto.UserResponse;
import org.jakubmiczek.todoapp.controller.dto.UserUpdateRequest;
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

    @PutMapping
    public ResponseEntity<Void> updateUser(@Valid @RequestBody UserUpdateRequest userUpdateRequest) {
        userService.updateUser(userUpdateRequest);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
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
