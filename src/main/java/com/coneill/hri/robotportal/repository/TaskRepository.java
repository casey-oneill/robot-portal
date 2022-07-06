package com.coneill.hri.robotportal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.coneill.hri.robotportal.entity.Task;

public interface TaskRepository extends CrudRepository<Task, Long> {

	Optional<Task> findById(long id);

	List<Task> findBySessionId(long sessionId);

}
