package org.jakubmiczek.todoapp.service;

import org.jakubmiczek.todoapp.repository.TaskRepository;
import org.jakubmiczek.todoapp.repository.UserRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    TaskRepository taskRepository;

    @Mock
    UserRepository userRepository;

    @InjectMocks
    TaskService taskService;
}
