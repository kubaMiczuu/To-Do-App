package org.jakubmiczek.todoapp.service;

import org.jakubmiczek.todoapp.dto.UserRequest;
import org.jakubmiczek.todoapp.dto.UserResponse;
import org.jakubmiczek.todoapp.dto.UserUpdateRequest;
import org.jakubmiczek.todoapp.exception.UserAlreadyExistException;
import org.jakubmiczek.todoapp.exception.UserDoesNotExistException;
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
        if (user.isPresent()) {
            throw new UserAlreadyExistException(userRequest.username());
        }

        User newUser = new User();
        newUser.setUsername(userRequest.username());
        newUser.setPassword(userRequest.password());

        userRepository.save(newUser);
    }

    public void updateUser(UserUpdateRequest userUpdateRequest) {
        User user = userRepository.findById(userUpdateRequest.userId())
                .orElseThrow(() -> new UserDoesNotExistException(userUpdateRequest.userId()));

        user.setUsername(userUpdateRequest.username());
        user.setPassword(userUpdateRequest.password());

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
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return user.get();
        }
        throw new UserDoesNotExistException(username);
    }

    private List<UserResponse> mapUserToUserResponse(List<User> users) {
        return users.stream().map(user -> new UserResponse(
                user.getUserId(), user.getUsername()
        )).toList();
    }
}
