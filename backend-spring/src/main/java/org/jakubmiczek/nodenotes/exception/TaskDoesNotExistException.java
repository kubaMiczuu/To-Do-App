package org.jakubmiczek.nodenotes.exception;

public class TaskDoesNotExistException extends TaskException {
    public TaskDoesNotExistException(Long id) {
        super("Task with ID: " + id + " does not exist");
    }
}
