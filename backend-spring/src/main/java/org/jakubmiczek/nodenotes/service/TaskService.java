package org.jakubmiczek.nodenotes.service;

import org.jakubmiczek.nodenotes.controller.dto.TaskRequest;
import org.jakubmiczek.nodenotes.controller.dto.TaskResponse;
import org.jakubmiczek.nodenotes.controller.dto.TaskUpdateRequest;
import org.jakubmiczek.nodenotes.exception.TaskAccessDeniedException;
import org.jakubmiczek.nodenotes.exception.TaskDoesNotExistException;
import org.jakubmiczek.nodenotes.exception.UserDoesNotExistException;
import org.jakubmiczek.nodenotes.entity.Task;
import org.jakubmiczek.nodenotes.entity.TaskStatus;
import org.jakubmiczek.nodenotes.entity.User;
import org.jakubmiczek.nodenotes.repository.TaskRepository;
import org.jakubmiczek.nodenotes.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public void addTask(TaskRequest taskRequest, String currentUsername) {
        Task newTask = new Task();
        newTask.setTitle(taskRequest.title());
        newTask.setDescription(taskRequest.description());
        newTask.setStatus(TaskStatus.TODO);

        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new UserDoesNotExistException(currentUsername));

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
    public Page<TaskResponse> getTasks(String username, TaskStatus taskStatus, String title, Pageable pageable) {
        Page<Task> desiredTasks;

        if(taskStatus != null && title != null && !title.isEmpty()) {
            desiredTasks = taskRepository.findByUser_UsernameAndStatusAndTitleContainingIgnoreCase(username, taskStatus, title, pageable);
        } else if(taskStatus != null) {
            desiredTasks = taskRepository.findByUser_UsernameAndStatus(username, taskStatus, pageable);
        } else if(title != null && !title.isEmpty()) {
            desiredTasks = taskRepository.findByUser_UsernameAndTitleContainingIgnoreCase(username, title, pageable);
        } else {
            desiredTasks = taskRepository.findByUser_Username(username, pageable);
        }

        return mapTaskToTaskResponse(desiredTasks);
    }

    private Page<TaskResponse> mapTaskToTaskResponse(Page<Task> tasks) {
        return tasks.map(task -> new TaskResponse(
                task.getTaskId(), task.getTitle(), task.getDescription(), task.getStatus(), task.getUser().getUsername())
        );
    }
}
