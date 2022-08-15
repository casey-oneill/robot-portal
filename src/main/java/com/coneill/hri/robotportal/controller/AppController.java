package com.coneill.hri.robotportal.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AppController {

	private static final Logger LOG = LoggerFactory.getLogger(AppController.class);

	/**
	 * Redirect all routes to React except: '/index**', '/api**', and static files
	 */
	@RequestMapping(value = {
			"/{path:^(?!api)(?!static)[-a-zA-Z0-9]+$}",
			"/{path:^(?!api)(?!static)[-a-zA-Z0-9]+$}/**"
	})
	public String index(@PathVariable String path) {
		LOG.info("AppController : path = " + path);
		return "forward:/";
	}
}
