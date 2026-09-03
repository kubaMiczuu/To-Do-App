package org.jakubmiczek.nodenotes.exception;

public class UserAlreadyExistException extends UserException {
    public UserAlreadyExistException(String username) {
        super("User '" + username + "' already exists");
    }
}
