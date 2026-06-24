package org.jakubmiczek.todoapp.controller.dto;

import org.jakubmiczek.todoapp.entity.TaskStatus;

public record TaskResponse(Long id, String title, String description, TaskStatus status, String username) {
}
