package org.jakubmiczek.nodenotes.controller.dto;

import jakarta.validation.constraints.NotBlank;

public record UserRequest(@NotBlank String username, @NotBlank String password) {
}
