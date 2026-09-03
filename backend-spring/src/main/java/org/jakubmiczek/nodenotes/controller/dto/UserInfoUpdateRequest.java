package org.jakubmiczek.nodenotes.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserInfoUpdateRequest(
        @NotBlank(message = "Username cannot be empty")
        @Size(min = 3, message = "Username must have at least 3 character")
        @Size(max = 20, message = "Username must have at most 20 characters")
        String username) {
}
