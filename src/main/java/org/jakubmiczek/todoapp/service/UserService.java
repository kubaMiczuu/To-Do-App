package org.jakubmiczek.todoapp.service;

import org.jakubmiczek.todoapp.dto.UserRequest;
import org.jakubmiczek.todoapp.dto.UserResponse;
import org.jakubmiczek.todoapp.exception.UserAlreadyExistException;
import org.jakubmiczek.todoapp.model.User;
import org.jakubmiczek.todoapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void addUser(UserRequest userRequest) {
        Optional<User> user = userRepository.findByUsername(userRequest.username());
        if (user.isPresent()) throw new UserAlreadyExistException(userRequest.username());

        User newUser = new User();
        newUser.setUsername(userRequest.username());
        newUser.setPassword(userRequest.password());

        userRepository.save(newUser);
    }

    public void deleteUser(String username) {
        userRepository.deleteByUsername(username);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<UserResponse> findAll() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponse(
                        user.getUserId(), user.getUsername()
                )).toList();
    }
}
