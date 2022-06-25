package com.coneill.hri.robotportal.security;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

public class JWTUtil {

	private static final Logger LOG = LoggerFactory.getLogger(JWTUtil.class);

	public String generateToken(String username) throws IllegalArgumentException, JWTCreationException {
		LOG.info("JWTUtil : generateToken");

		return JWT.create()
				.withSubject("User Details")
				.withClaim("username", username)
				.withIssuedAt(new Date())
				.withIssuer("ROBOT PORTAL")
				.sign(Algorithm.HMAC256(SecurityConstants.SECRET));
	}

	public String validateTokenAndRetrieveSubject(String token) throws JWTVerificationException {
		LOG.info("JWTUtil : validateTokenAndRetrieveSubject : secret = " + SecurityConstants.SECRET);

		JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SecurityConstants.SECRET))
				.withSubject("User Details")
				.withIssuer("ROBOT PORTAL")
				.build();
		DecodedJWT jwt = verifier.verify(token);
		return jwt.getClaim("username").asString();
	}

}
