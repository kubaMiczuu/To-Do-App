package org.jakubmiczek.todoapp.service;

import org.jakubmiczek.todoapp.controller.dto.TaskRequest;
import org.jakubmiczek.todoapp.controller.dto.TaskResponse;
import org.jakubmiczek.todoapp.controller.dto.TaskUpdateRequest;
import org.jakubmiczek.todoapp.exception.TaskAccessDeniedException;
import org.jakubmiczek.todoapp.exception.TaskDoesNotExistException;
import org.jakubmiczek.todoapp.exception.UserDoesNotExistException;
import org.jakubmiczek.todoapp.entity.Task;
import org.jakubmiczek.todoapp.entity.TaskStatus;
import org.jakubmiczek.todoapp.entity.User;
import org.jakubmiczek.todoapp.repository.TaskRepository;
import org.jakubmiczek.todoapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public void addTask(TaskRequest taskRequest) {
        Task newTask = new Task();
        newTask.setTitle(taskRequest.title());
        newTask.setDescription(taskRequest.description());
        newTask.setStatus(TaskStatus.TODO);

        User user = userRepository.findByUsername(taskRequest.username())
                .orElseThrow(() -> new UserDoesNotExistException(taskRequest.username()));

        newTask.setUser(user);

        taskRepository.save(newTask);
    }

    public void updateTask(TaskUpdateRequest taskUpdateRequest, String currentUsername) {
        Task taskToUpdate = taskRepository.findById(taskUpdateRequest.taskId())
                .orElseThrow(() -> new TaskDoesNotExistException(taskUpdateRequest.taskId()));

        if(!taskToUpdate.getUser().getUsername().equals(currentUsername)) throw new TaskAccessDeniedException();

        taskToUpdate.setTitle(taskUpdateRequest.title());
        taskToUpdate.setDescription(taskUpdateRequest.description());
        taskToUpdate.setStatus(taskUpdateRequest.status());
        taskRepository.save(taskToUpdate);
    }

    public void deleteTask(Long taskId, String currentUsername) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskDoesNotExistException(taskId));

        if(!task.getUser().getUsername().equals(currentUsername)) throw new TaskAccessDeniedException();

        taskRepository.delete(task);
    }

    public List<TaskResponse> getTaskByUserId(Long userId) {
        List<Task> desiredTasks = taskRepository.findByUser_UserId(userId);
        return mapTaskToTaskResponse(desiredTasks);
    }

    public List<TaskResponse> getTasksByStatusForUser(Long userId, TaskStatus taskStatus) {
        List<Task> desiredTasks = taskRepository.findByUser_UserIdAndStatus(userId, taskStatus);
        return mapTaskToTaskResponse(desiredTasks);
    }

    public List<TaskResponse> getAllTasks() {
        return mapTaskToTaskResponse(taskRepository.findAll());
    }

    private List<TaskResponse> mapTaskToTaskResponse(List<Task> tasks) {
        return tasks.stream().map(task -> new TaskResponse(
                task.getTaskId(), task.getTitle(), task.getDescription(), task.getStatus(), task.getUser().getUsername()
        )).toList();
    }
}
