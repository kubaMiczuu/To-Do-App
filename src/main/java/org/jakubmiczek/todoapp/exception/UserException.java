package org.jakubmiczek.todoapp.exception;

public class UserException extends RuntimeException {
    public UserException(String message) {
        super(message);
    }
}
