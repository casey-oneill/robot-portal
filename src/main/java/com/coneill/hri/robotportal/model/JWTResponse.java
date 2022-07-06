package com.coneill.hri.robotportal.model;

public class JWTResponse {

	private String jwtToken;

	public JWTResponse(String jwtToken) {
		this.jwtToken = jwtToken;
	}

	public String getJwtToken() {
		return jwtToken;
	}

}
