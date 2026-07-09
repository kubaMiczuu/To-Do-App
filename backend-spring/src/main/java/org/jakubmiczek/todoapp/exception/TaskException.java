package org.jakubmiczek.todoapp.exception;

public class TaskException extends RuntimeException {
    public TaskException(String message) {
        super(message);
    }
}
