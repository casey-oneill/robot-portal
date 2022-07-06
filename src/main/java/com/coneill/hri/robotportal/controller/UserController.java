package com.coneill.hri.robotportal.controller;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coneill.hri.robotportal.entity.Session;
import com.coneill.hri.robotportal.entity.User;
import com.coneill.hri.robotportal.repository.SessionRepository;
import com.coneill.hri.robotportal.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private static final Logger LOG = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private SessionRepository sessionRepository;

	@GetMapping(value = "/info")
	public ResponseEntity<User> getUserDetails() {
		LOG.info("/users/info");

		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return ResponseEntity.ok(userRepository.findByUsername(username).get());
	}

	@GetMapping("/{userId}/sessions")
	public ResponseEntity<List<Session>> getSessionTasks(@PathVariable Long userId) {
		LOG.info("/users/sessions : userId = " + userId);

		Optional<User> oUser = userRepository.findById(userId);

		if (oUser.isPresent()) {
			List<Session> sessions = sessionRepository.findByUserId(userId);
			return ResponseEntity.ok(sessions);
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

}
