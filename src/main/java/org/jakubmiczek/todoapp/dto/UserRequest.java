package org.jakubmiczek.todoapp.dto;

import jakarta.validation.constraints.NotBlank;

public record UserRequest(@NotBlank String username, @NotBlank String password) {
}
