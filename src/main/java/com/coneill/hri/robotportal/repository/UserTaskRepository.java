package com.coneill.hri.robotportal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.coneill.hri.robotportal.entity.UserTask;

public interface UserTaskRepository extends CrudRepository<UserTask, Long> {

	Optional<UserTask> findById(long userTaskId);

	List<UserTask> findByUserId(long userId);

}
