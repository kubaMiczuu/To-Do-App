package org.jakubmiczek.todoapp.controller.dto;

public record UserUpdateRequest(Long userId, String username, String password) {
}
