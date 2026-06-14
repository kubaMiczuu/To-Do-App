package org.jakubmiczek.todoapp.service;

import org.jakubmiczek.todoapp.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserService userService;

    @Test
    void shouldAddUserCorrectly() {

    }

    @Test
    void shouldDeleteUserCorrectly() {

    }
}
