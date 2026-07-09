package org.jakubmiczek.todoapp.service;

import org.jakubmiczek.todoapp.controller.dto.UserRequest;
import org.jakubmiczek.todoapp.controller.dto.UserUpdateRequest;
import org.jakubmiczek.todoapp.entity.User;
import org.jakubmiczek.todoapp.exception.UserAlreadyExistException;
import org.jakubmiczek.todoapp.exception.UserDoesNotExistException;
import org.jakubmiczek.todoapp.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @Mock
    PasswordEncoder passwordEncoder;

    @InjectMocks
    UserService userService;

    @Test
    void shouldAddUserCorrectly() {
        UserRequest userRequest = new UserRequest("username", "password");
        String encodedPassword = "hashedPassword";

        when(userRepository.findByUsername("username")).thenReturn(Optional.empty());
        when(passwordEncoder.encode(userRequest.password())).thenReturn(encodedPassword);
        userService.addUser(userRequest);

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());

        assertThat(captor.getValue().getUsername()).isEqualTo("username");
        assertThat(captor.getValue().getPassword()).isEqualTo(encodedPassword);
    }

    @Test
    void shouldThrowUserAlreadyExistsExceptionWhenCreatingNewUser() {
        User user = new User();
        user.setUserId(1L);
        user.setUsername("username");
        user.setPassword("password");

        when(userRepository.findByUsername("username")).thenReturn(Optional.of(user));

        assertThatThrownBy(() -> userService.addUser(new UserRequest("username", "password")))
                .isInstanceOf(UserAlreadyExistException.class);
    }

    @Test
    void shouldUpdateUserCorrectly() {
        User user = new User();
        user.setUserId(1L);
        user.setUsername("username");
        user.setPassword("password");

        UserUpdateRequest userRequest = new UserUpdateRequest(user.getUserId(), "user", "passw");

        String encodedPassword = "hashedPassword";

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.findByUsername("user")).thenReturn(Optional.empty());
        when(passwordEncoder.encode(userRequest.password())).thenReturn(encodedPassword);
        userService.updateUser(userRequest);

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());

        assertThat(captor.getValue().getUsername()).isEqualTo("user");
        assertThat(captor.getValue().getPassword()).isEqualTo(encodedPassword);
    }

    @Test
    void shouldThrowUserAlreadyExistsExceptionWhenUpdatingUser() {
        User user1 = new User();
        user1.setUserId(1L);
        user1.setUsername("username");
        user1.setPassword("password");

        User user2 = new User();
        user2.setUserId(2L);
        user2.setUsername("username2");
        user2.setPassword("password2");

        UserUpdateRequest userRequest = new UserUpdateRequest(2L, "username", "passw");

        when(userRepository.findById(2L)).thenReturn(Optional.of(user2));
        when(userRepository.findByUsername("username")).thenReturn(Optional.of(user1));

        assertThatThrownBy(() -> userService.updateUser(userRequest))
                .isInstanceOf(UserAlreadyExistException.class);
    }

    @Test
    void shouldDeleteUserCorrectly() {
        User user = new User();
        user.setUserId(1L);
        user.setUsername("username");
        user.setPassword("password");

        when(userRepository.findByUsername("username")).thenReturn(Optional.of(user));
        userService.deleteUser("username");

        verify(userRepository).delete(user);
    }

    @Test
    void shouldThrowUserNotFoundExceptionWhenDeletingUser() {
        when(userRepository.findByUsername("username")).thenReturn(Optional.empty());
        assertThatThrownBy(() -> userService.deleteUser("username"))
                .isInstanceOf(UserDoesNotExistException.class);
    }
}
