package org.jakubmiczek.todoapp.service;

import org.jakubmiczek.todoapp.controller.dto.UserRequest;
import org.jakubmiczek.todoapp.controller.dto.UserResponse;
import org.jakubmiczek.todoapp.controller.dto.UserUpdateRequest;
import org.jakubmiczek.todoapp.exception.UserAlreadyExistException;
import org.jakubmiczek.todoapp.exception.UserDoesNotExistException;
import org.jakubmiczek.todoapp.entity.User;
import org.jakubmiczek.todoapp.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public void updateUser(UserUpdateRequest userUpdateRequest) {
        User user = userRepository.findById(userUpdateRequest.userId())
                .orElseThrow(() -> new UserDoesNotExistException(userUpdateRequest.userId()));

        Optional<User> existingUser = userRepository.findByUsername(userUpdateRequest.username());
        if(existingUser.isPresent() && !existingUser.get().getUserId().equals(userUpdateRequest.userId())) {
            throw new UserAlreadyExistException(userUpdateRequest.username());
        }

        user.setUsername(userUpdateRequest.username());
        user.setPassword(passwordEncoder.encode(userUpdateRequest.password()));

        userRepository.save(user);
    }

    public void deleteUser(String username) {
        User user = getUserByUsername(username);
        userRepository.delete(user);
    }

    public List<UserResponse> findAll() {
        return mapUserToUserResponse(userRepository.findAll());
    }

    private User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserDoesNotExistException(username));
    }

    private List<UserResponse> mapUserToUserResponse(List<User> users) {
        return users.stream().map(user -> new UserResponse(
                user.getUserId(), user.getUsername()
        )).toList();
    }
}
