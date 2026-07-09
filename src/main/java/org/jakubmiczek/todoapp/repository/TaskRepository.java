package org.jakubmiczek.todoapp.repository;

import org.jakubmiczek.todoapp.entity.Task;
import org.jakubmiczek.todoapp.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUser_Username(String username);

    List<Task> findByUser_UsernameAndStatus(String username, TaskStatus status);
}
