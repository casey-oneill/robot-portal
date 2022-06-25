package com.coneill.hri.robotportal.security;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.coneill.hri.robotportal.entity.User;
import com.coneill.hri.robotportal.repository.UserRepository;

public class JWTFilter extends BasicAuthenticationFilter {

	private static final Logger LOG = LoggerFactory.getLogger(JWTFilter.class);

	private UserRepository userRepository;
	private JWTUtil jwtUtil = new JWTUtil();

	public JWTFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
		super(authenticationManager);
		this.userRepository = userRepository;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		LOG.info("JWTFilter : doFilterInternal");

		String header = request.getHeader(SecurityConstants.HEADER_STRING);

		if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) {
			filterChain.doFilter(request, response);
			return;
		}

		UsernamePasswordAuthenticationToken authentication = getAuthentication(request);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		filterChain.doFilter(request, response);
	}

	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		String token = request.getHeader(SecurityConstants.HEADER_STRING);

		if (token != null && !token.isBlank()) {
			token = token.replace(SecurityConstants.TOKEN_PREFIX, "");

			String username = jwtUtil.validateTokenAndRetrieveSubject(token);

			if (username != null && !username.isBlank()) {
				User user = userRepository.findByUsername(username).get();
				List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ROLE_USER");
				return new UsernamePasswordAuthenticationToken(user.getUsername(), null, authorities);
			}
		}

		return null;
	}

}
