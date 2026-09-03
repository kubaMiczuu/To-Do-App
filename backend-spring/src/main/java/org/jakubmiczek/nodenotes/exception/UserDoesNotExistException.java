package org.jakubmiczek.nodenotes.exception;

public class UserDoesNotExistException extends UserException {
    public UserDoesNotExistException(String username) {
        super("User '" +  username + "' does not exist");
    }
}
