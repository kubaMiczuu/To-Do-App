package org.jakubmiczek.nodenotes.repository;

import org.jakubmiczek.nodenotes.entity.Task;
import org.jakubmiczek.nodenotes.entity.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findByUser_Username(String username, Pageable pageable);

    Page<Task> findByUser_UsernameAndStatus(String username, TaskStatus status, Pageable pageable);

    Page<Task> findByUser_UsernameAndTitleContainingIgnoreCase(String username, String title, Pageable pageable);

    Page<Task> findByUser_UsernameAndStatusAndTitleContainingIgnoreCase(String username, TaskStatus status, String title, Pageable pageable);
}
