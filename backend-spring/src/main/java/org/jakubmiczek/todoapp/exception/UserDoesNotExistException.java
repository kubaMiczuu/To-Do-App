package org.jakubmiczek.todoapp.exception;

public class UserDoesNotExistException extends UserException {
    public UserDoesNotExistException(String username) {
        super("User '" +  username + "' does not exist");
    }
    public UserDoesNotExistException(Long userId) {
        super("User with ID: " + userId + " does not exist");
    }
}
