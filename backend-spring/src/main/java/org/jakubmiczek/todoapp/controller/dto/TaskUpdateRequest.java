package org.jakubmiczek.todoapp.controller.dto;

import jakarta.validation.constraints.NotBlank;
import org.jakubmiczek.todoapp.entity.TaskStatus;

public record TaskUpdateRequest(Long taskId, @NotBlank String title, String description, TaskStatus status, @NotBlank String username) {
}
