package org.jakubmiczek.nodenotes.controller.dto;

import org.jakubmiczek.nodenotes.entity.TaskStatus;

public record TaskResponse(Long id, String title, String description, TaskStatus status, String username) {
}
