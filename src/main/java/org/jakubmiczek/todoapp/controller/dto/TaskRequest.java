package org.jakubmiczek.todoapp.controller.dto;

import jakarta.validation.constraints.NotBlank;

public record TaskRequest(@NotBlank String title, String description, @NotBlank String username) {
}
