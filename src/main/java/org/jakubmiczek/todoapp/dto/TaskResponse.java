package org.jakubmiczek.todoapp.dto;

import org.jakubmiczek.todoapp.model.TaskStatus;
import org.jakubmiczek.todoapp.model.User;

public record TaskResponse(Long id, String title, String description, TaskStatus status, String username) {
}
