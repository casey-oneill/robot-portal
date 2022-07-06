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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coneill.hri.robotportal.entity.Session;
import com.coneill.hri.robotportal.entity.Task;
import com.coneill.hri.robotportal.repository.SessionRepository;
import com.coneill.hri.robotportal.repository.TaskRepository;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

	private static final Logger LOG = LoggerFactory.getLogger(Session.class);

	@Autowired
	private SessionRepository sessionRepository;
	@Autowired
	private TaskRepository taskRepository;

	@GetMapping("/{sessionId}")
	public ResponseEntity<Session> getSession(@PathVariable Long sessionId) {
		LOG.info("/sessions : getSession : sessionId = " + sessionId);

		Optional<Session> oSession = sessionRepository.findById(sessionId);

		if (oSession.isPresent()) {
			return ResponseEntity.ok(oSession.get());
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@GetMapping("/{sessionId}/tasks")
	public ResponseEntity<List<Task>> getSessionTasks(@PathVariable Long sessionId) {
		LOG.info("/sessions/tasks : sessionId = " + sessionId);

		Optional<Session> oSession = sessionRepository.findById(sessionId);

		if (oSession.isPresent()) {
			List<Task> tasks = taskRepository.findBySessionId(sessionId);
			return ResponseEntity.ok(tasks);
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@PostMapping
	public ResponseEntity<Session> createSession(@RequestBody Session session) {
		LOG.info("/sessions : createSession");

		if (session != null) {
			session.setCreatedTime(Date.from(Instant.now()));
			return ResponseEntity.ok(sessionRepository.save(session));
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	}

}
