package org.jakubmiczek.nodenotes.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserPasswordUpdateRequest(
        @NotBlank(message = "Old password cannot be empty")
        String oldPassword,

        @NotBlank(message = "New password cannot be empty")
        @Size(min = 8, message = "Password must have at least 8 characters")
        String newPassword) {
}
