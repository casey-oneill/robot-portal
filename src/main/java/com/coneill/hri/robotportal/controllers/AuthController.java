package com.coneill.hri.robotportal.controllers;

import java.util.Collections;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coneill.hri.robotportal.entity.User;
import com.coneill.hri.robotportal.models.LoginCredentials;
import com.coneill.hri.robotportal.repository.UserRepository;
import com.coneill.hri.robotportal.security.JWTUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private static final Logger LOG = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private JWTUtil jwtUtil = new JWTUtil();

	@GetMapping("/info")
	public String info() {
		LOG.info("/auth/info : Authentication endpoint.");
		return "Authentication endpoint.";
	}

	@PostMapping(value = "/register")
	public Map<String, Object> registerHandler(@RequestBody User user) {
		LOG.info("/auth/register : username = " + user.getUsername() + ", password = " + user.getPassword());
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		user = userRepository.save(user);

		String token = jwtUtil.generateToken(user.getUsername());
		return Collections.singletonMap("jwt-token", token);
	}

	@PostMapping(value = "/login")
	public Map<String, Object> loginHandler(@RequestBody LoginCredentials body) {
		try {
			LOG.info("/auth/login : username = " + body.getUsername() + ", password = " + body.getPassword());

			// TODO: Authenticate username and password

			String token = jwtUtil.generateToken(body.getUsername());

			return Collections.singletonMap("jwt-token", token);
		} catch (AuthenticationException e) {
			throw new RuntimeException("Invalid login credentials.");
		}
	}

}
