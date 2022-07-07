package com.coneill.hri.robotportal.controller;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coneill.hri.robotportal.entity.Task;
import com.coneill.hri.robotportal.repository.TaskRepository;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

	private static final Logger LOG = LoggerFactory.getLogger(TaskController.class);

	@Autowired
	private TaskRepository taskRepository;

	@GetMapping("/{taskId}")
	public ResponseEntity<Task> getTask(@PathVariable Long taskId) {
		LOG.info("/tasks : getTask : taskId = " + taskId);

		Optional<Task> oTask = taskRepository.findById(taskId);

		if (oTask.isPresent()) {
			return ResponseEntity.ok(oTask.get());
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@PutMapping
	public ResponseEntity<Task> updateTask(@RequestBody Task updatedTask) {
		LOG.info("/tasks : updateTask : taskId = " + updatedTask.getId());

		Optional<Task> oTask = taskRepository.findById(updatedTask.getId());

		if (oTask.isPresent()) {
			Task task = taskRepository.save(updatedTask);
			return ResponseEntity.ok(task);
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@PostMapping
	public ResponseEntity<Task> createTask(@RequestBody Task task) {
		LOG.info("/tasks : createTask");

		if (task != null) {
			return ResponseEntity.ok(taskRepository.save(task));
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	}

}
