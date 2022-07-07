package com.coneill.hri.robotportal.controller;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coneill.hri.robotportal.entity.User;
import com.coneill.hri.robotportal.entity.UserTask;
import com.coneill.hri.robotportal.repository.UserRepository;
import com.coneill.hri.robotportal.repository.UserTaskRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private static final Logger LOG = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserTaskRepository userTaskRepository;

	@GetMapping(value = "/info")
	public ResponseEntity<User> getUserDetails() {
		LOG.info("/users/info");

		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return ResponseEntity.ok(userRepository.findByUsername(username).get());
	}

	@GetMapping("/{userId}/tasks")
	public ResponseEntity<List<UserTask>> getUserTasks(@PathVariable Long userId) {
		LOG.info("/users/tasks : getUserTasks : userId = " + userId);

		Optional<User> oUser = userRepository.findById(userId);

		if (oUser.isPresent()) {
			List<UserTask> tasks = userTaskRepository.findByUserId(userId);
			return ResponseEntity.ok(tasks);
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@PostMapping("/{userId}/tasks")
	public ResponseEntity<UserTask> createUserTask(@PathVariable Long userId, @RequestBody UserTask userTask) {
		LOG.info("/users/tasks : createUserTask : userId = " + userId);

		Optional<User> oUser = userRepository.findById(userId);

		if (oUser.isPresent()) {
			userTask.setComplete(false);
			userTask.setCreatedTime(Date.from(Instant.now()));
			return ResponseEntity.ok(userTaskRepository.save(userTask));
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@PutMapping("/{userId}/tasks")
	public ResponseEntity<UserTask> updateUserTask(@PathVariable Long userId, @RequestBody UserTask userTask) {
		LOG.info("/users/tasks : updateUserTask : userId = " + userId);

		Optional<User> oUser = userRepository.findById(userId);

		if (oUser.isPresent()) {
			Optional<UserTask> oUserTask = userTaskRepository.findById(userTask.getId());

			if (oUserTask.isPresent()) {
				userTask.setCreatedTime(oUserTask.get().getCreatedTime());
				if (!oUserTask.get().isComplete() && userTask.isComplete()) {
					userTask.setCompletedTime(Date.from(Instant.now()));
				}
				return ResponseEntity.ok(userTaskRepository.save(userTask));
			}
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

}
