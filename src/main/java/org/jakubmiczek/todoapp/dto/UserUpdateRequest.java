package org.jakubmiczek.todoapp.dto;

public record UserUpdateRequest(Long userId, String username, String password) {
}
