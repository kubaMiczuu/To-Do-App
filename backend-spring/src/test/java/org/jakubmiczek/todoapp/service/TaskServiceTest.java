package org.jakubmiczek.todoapp.service;

import org.jakubmiczek.todoapp.controller.dto.TaskRequest;
import org.jakubmiczek.todoapp.controller.dto.TaskResponse;
import org.jakubmiczek.todoapp.controller.dto.TaskUpdateRequest;
import org.jakubmiczek.todoapp.entity.Task;
import org.jakubmiczek.todoapp.entity.TaskStatus;
import org.jakubmiczek.todoapp.entity.User;
import org.jakubmiczek.todoapp.exception.TaskAccessDeniedException;
import org.jakubmiczek.todoapp.exception.TaskDoesNotExistException;
import org.jakubmiczek.todoapp.exception.UserDoesNotExistException;
import org.jakubmiczek.todoapp.repository.TaskRepository;
import org.jakubmiczek.todoapp.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    TaskRepository taskRepository;

    @Mock
    UserRepository userRepository;

    @InjectMocks
    TaskService taskService;

    @Test
    void shouldAddTaskCorrectly() {
        User user = new User();
        user.setUserId(1L);
        user.setUsername("username");
        user.setPassword("password");

        TaskRequest taskRequest = new TaskRequest("task", "test task");

        when(userRepository.findByUsername("username")).thenReturn(Optional.of(user));
        String currentUsername = "username";

        taskService.addTask(taskRequest, currentUsername);

        ArgumentCaptor<Task> captor = ArgumentCaptor.forClass(Task.class);

        verify(taskRepository).save(captor.capture());

        assertThat(captor.getValue().getTitle()).isEqualTo("task");
        assertThat(captor.getValue().getDescription()).isEqualTo("test task");
        assertThat(captor.getValue().getStatus()).isEqualTo(TaskStatus.TODO);
        assertThat(captor.getValue().getUser()).isEqualTo(user);
    }

    @Test
    void shouldThrowUserDoesNotExistExceptionWhenAddingTask() {
        when(userRepository.findByUsername("username")).thenReturn(Optional.empty());
        assertThatThrownBy(() -> taskService.addTask(new TaskRequest("task", "test task"),"username"))
                .isInstanceOf(UserDoesNotExistException.class);
    }

    @Test
    void shouldUpdateTaskCorrectly() {
        User user = new User();
        user.setUserId(1L);
        user.setUsername("username");
        user.setPassword("password");

        Task task = new Task();
        task.setTaskId(1L);
        task.setTitle("task");
        task.setDescription("test task");
        task.setStatus(TaskStatus.TODO);
        task.setUser(user);

        TaskUpdateRequest taskUpdateRequest = new TaskUpdateRequest(1L, "task1", "test task1", TaskStatus.DONE, "username");
        String currentUsername = "username";

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        taskService.updateTask(taskUpdateRequest, currentUsername);

        ArgumentCaptor<Task> captor = ArgumentCaptor.forClass(Task.class);
        verify(taskRepository).save(captor.capture());

        assertThat(captor.getValue().getTitle()).isEqualTo("task1");
        assertThat(captor.getValue().getDescription()).isEqualTo("test task1");
        assertThat(captor.getValue().getStatus()).isEqualTo(TaskStatus.DONE);
    }

    @Test
    void shouldThrowTaskDoesNotExistExceptionWhenUpdatingTask() {
        TaskUpdateRequest taskUpdateRequest = new TaskUpdateRequest(1L, "task1", "test task1", TaskStatus.DONE, "user");

        when(taskRepository.findById(1L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> taskService.updateTask(taskUpdateRequest, "user"))
                .isInstanceOf(TaskDoesNotExistException.class);
    }

    @Test
    void shouldThrowTaskAccessDeniedExceptionWhenUpdatingTask() {
        User user = new User();
        user.setUserId(1L);
        user.setUsername("user1");
        user.setPassword("password");

        Task task = new Task();
        task.setTaskId(1L);
        task.setTitle("task");
        task.setDescription("test task");
        task.setStatus(TaskStatus.TODO);
        task.setUser(user);

        TaskUpdateRequest taskUpdateRequest = new TaskUpdateRequest(1L, "task1", "test task1", TaskStatus.DONE, "user");
        String currentUsername = "username";

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        assertThatThrownBy(() -> taskService.updateTask(taskUpdateRequest, currentUsername))
                .isInstanceOf(TaskAccessDeniedException.class);
    }

    @Test
    void shouldDeleteTaskCorrectly() {
        User user = new User();
        user.setUserId(1L);
        user.setUsername("user");
        user.setPassword("password");

        Task task = new Task();
        task.setTaskId(1L);
        task.setTitle("task");
        task.setDescription("test task");
        task.setStatus(TaskStatus.TODO);
        task.setUser(user);

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        taskService.deleteTask(1L, "user");

        verify(taskRepository).delete(task);
    }

    @Test
    void shouldThrowTaskDoesNotExistExceptionWhenDeletingTask() {
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> taskService.deleteTask(1L, "user"))
                .isInstanceOf(TaskDoesNotExistException.class);
    }

    @Test
    void shouldThrowTaskAccessDeniedExceptionWhenDeletingTask() {
        User user = new User();
        user.setUserId(1L);
        user.setUsername("user1");
        user.setPassword("password");

        Task task = new Task();
        task.setTaskId(1L);
        task.setTitle("task");
        task.setDescription("test task");
        task.setStatus(TaskStatus.TODO);
        task.setUser(user);

        String currentUsername = "username";

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        assertThatThrownBy(() -> taskService.deleteTask(1L, currentUsername))
                .isInstanceOf(TaskAccessDeniedException.class);
    }

    @Test
    void shouldReturnTasksByUser() {
        User user = new User();
        user.setUserId(1L);
        user.setUsername("user");
        user.setPassword("password");

        Task task1 = new Task();
        task1.setTaskId(1L);
        task1.setTitle("task");
        task1.setDescription("test task");
        task1.setStatus(TaskStatus.TODO);
        task1.setUser(user);

        Task task2 = new Task();
        task2.setTaskId(2L);
        task2.setTitle("task");
        task2.setDescription("test task");
        task2.setStatus(TaskStatus.TODO);

        Pageable pageable = PageRequest.of(0, 1);
        Page<Task> pagedTasks = new PageImpl<>(List.of(task1), pageable, 1);

        when(taskRepository.findByUser_Username("user", pageable)).thenReturn(pagedTasks);
        Page<TaskResponse> userTasks = taskService.getTaskByUsername("user", pageable);

        assertThat(userTasks.getContent().size()).isEqualTo(1);
        assertThat(userTasks.getContent().getFirst().title()).isEqualTo("task");
    }

    @Test
    void shouldReturnTaskByUserAndStatus() {
        User user = new User();
        user.setUserId(1L);
        user.setUsername("user");
        user.setPassword("password");

        Task task1 = new Task();
        task1.setTaskId(1L);
        task1.setTitle("task");
        task1.setDescription("test task");
        task1.setStatus(TaskStatus.TODO);
        task1.setUser(user);

        Task task2 = new Task();
        task2.setTaskId(2L);
        task2.setTitle("task");
        task2.setDescription("test task");
        task2.setStatus(TaskStatus.DONE);
        task2.setUser(user);

        Pageable pageable = PageRequest.of(0, 1);
        Page<Task> pagedTasks = new PageImpl<>(List.of(task1), pageable, 1);

        when(taskRepository.findByUser_UsernameAndStatus("user", TaskStatus.DONE, pageable)).thenReturn(pagedTasks);
        Page<TaskResponse> userTasks = taskService.getTasksByStatusForUser("user", TaskStatus.DONE, pageable);

        assertThat(userTasks.getContent().size()).isEqualTo(1);
        assertThat(userTasks.getContent().getFirst().title()).isEqualTo("task");
    }

}
