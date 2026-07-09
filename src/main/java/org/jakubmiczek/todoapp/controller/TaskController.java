package org.jakubmiczek.todoapp.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jakubmiczek.todoapp.controller.dto.TaskRequest;
import org.jakubmiczek.todoapp.controller.dto.TaskResponse;
import org.jakubmiczek.todoapp.controller.dto.TaskUpdateRequest;
import org.jakubmiczek.todoapp.entity.TaskStatus;
import org.jakubmiczek.todoapp.service.TaskService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<Void> createTask(@Valid @RequestBody TaskRequest taskRequest, Principal principal) {
        taskService.addTask(taskRequest, principal.getName());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> updateTask(@Valid @RequestBody TaskUpdateRequest taskUpdateRequest, Principal principal) {
        taskService.updateTask(taskUpdateRequest, principal.getName());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id, Principal principal) {
        taskService.deleteTask(id, principal.getName());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping
    public ResponseEntity<Page<TaskResponse>> getTasksByAccount(Principal principal, @PageableDefault(sort = "taskId", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(taskService.getTaskByUsername(principal.getName(), pageable));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<Page<TaskResponse>> getTasksByAccountAndStatus(@PathVariable TaskStatus status, Principal principal, @PageableDefault(sort = "taskId", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(taskService.getTasksByStatusForUser(principal.getName(), status, pageable));
    }
}
