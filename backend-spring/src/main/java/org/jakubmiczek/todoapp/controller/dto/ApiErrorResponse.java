package org.jakubmiczek.todoapp.controller.dto;

import java.time.LocalDateTime;
import java.util.List;

public record ApiErrorResponse(int status, List<String> message, LocalDateTime timestamp) {
}
