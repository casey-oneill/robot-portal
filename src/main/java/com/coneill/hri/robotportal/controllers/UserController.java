package com.coneill.hri.robotportal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coneill.hri.robotportal.entity.User;
import com.coneill.hri.robotportal.repository.UserRepository;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@GetMapping(value = "/info")
	public User getUserDetails() {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return userRepository.findByUsername(username).get();
	}

}
