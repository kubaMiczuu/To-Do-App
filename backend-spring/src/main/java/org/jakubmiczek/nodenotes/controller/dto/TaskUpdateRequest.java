package org.jakubmiczek.nodenotes.controller.dto;

import jakarta.validation.constraints.NotBlank;
import org.jakubmiczek.nodenotes.entity.TaskStatus;

public record TaskUpdateRequest(Long taskId, @NotBlank String title, String description, TaskStatus status) {
}
