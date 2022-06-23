package com.coneill.hri.robotportal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SessionController {

	@GetMapping("/api/sessions")
	public String sessionId() {
		return "Session information....";
	}
}
