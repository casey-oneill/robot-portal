package com.coneill.hri.robotportal.model;

public class JWTResponse {

	private String token;

	public JWTResponse(String token) {
		this.token = token;
	}

	public String getToken() {
		return token;
	}

}
