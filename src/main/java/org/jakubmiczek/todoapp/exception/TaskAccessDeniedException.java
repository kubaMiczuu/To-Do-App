package org.jakubmiczek.todoapp.exception;

public class TaskAccessDeniedException extends TaskException {
    public TaskAccessDeniedException() {
        super("You are not allowed to perform this action");
    }
}
