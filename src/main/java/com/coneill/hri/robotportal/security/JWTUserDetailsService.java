package com.coneill.hri.robotportal.security;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.coneill.hri.robotportal.entity.User;
import com.coneill.hri.robotportal.repository.UserRepository;

@Component
public class JWTUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> oUser = userRepository.findByUsername(username);

		if (oUser.isEmpty()) {
			throw new UsernameNotFoundException("Could not find user with username = " + username);
		}

		User user = oUser.get();
		return new org.springframework.security.core.userdetails.User(username, user.getPassword(),
				Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
	}

}
