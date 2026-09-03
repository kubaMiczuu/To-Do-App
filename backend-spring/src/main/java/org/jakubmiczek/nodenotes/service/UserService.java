package org.jakubmiczek.nodenotes.service;

import org.jakubmiczek.nodenotes.controller.dto.UserPasswordUpdateRequest;
import org.jakubmiczek.nodenotes.controller.dto.UserRequest;
import org.jakubmiczek.nodenotes.controller.dto.UserResponse;
import org.jakubmiczek.nodenotes.exception.UserAlreadyExistException;
import org.jakubmiczek.nodenotes.exception.UserDoesNotExistException;
import org.jakubmiczek.nodenotes.entity.User;
import org.jakubmiczek.nodenotes.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void addUser(UserRequest userRequest) {
        Optional<User> user = userRepository.findByUsername(userRequest.username());
        if (user.isPresent()) {
            throw new UserAlreadyExistException(userRequest.username());
        }

        User newUser = new User();
        newUser.setUsername(userRequest.username());
        newUser.setPassword(passwordEncoder.encode(userRequest.password()));

        userRepository.save(newUser);
    }

    public void updateUserInfo(String currentUsername, String newUsername) {
        User user = getUserByUsername(currentUsername);

        Optional<User> existingUser = userRepository.findByUsername(newUsername);
        if(existingUser.isPresent() && !existingUser.get().getUserId().equals(user.getUserId())) {
            throw new UserAlreadyExistException(newUsername);
        }

        user.setUsername(newUsername);
        userRepository.save(user);
    }

    public void updatePassword(String currentUsername, UserPasswordUpdateRequest request) {
        User user = getUserByUsername(currentUsername);

        if(!passwordEncoder.matches(request.oldPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid old password");
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }

    public void deleteUser(String username) {
        User user = getUserByUsername(username);
        userRepository.delete(user);
    }

    public UserResponse getUserProfile(String username) {
        User user = getUserByUsername(username);

        return new UserResponse(user.getUserId(), user.getUsername());
    }

    private User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserDoesNotExistException(username));
    }
}
