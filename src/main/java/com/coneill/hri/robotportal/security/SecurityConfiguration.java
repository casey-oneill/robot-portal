package com.coneill.hri.robotportal.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.coneill.hri.robotportal.repository.UserRepository;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {

	@Autowired
	private JWTUserDetailsService userDetailsService;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		// Configure AuthenticationManagerBuilder
		AuthenticationManagerBuilder authenticationManagerBuilder = http
				.getSharedObject(AuthenticationManagerBuilder.class);
		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);

		// Get AuthenticationManager
		AuthenticationManager authenticationManager = authenticationManagerBuilder.build();

		http
				.cors().and()
				.csrf().disable()
				.authorizeRequests()
				.antMatchers("/").permitAll()
				.antMatchers("/static/**").permitAll()
				.antMatchers("/accounts/**").permitAll()
				.antMatchers("/api/auth/**").permitAll()
				.antMatchers("/favicon.ico", "/manifest.json", "/logo192.png", "/logo512.png", "/robots.txt").permitAll()
				.anyRequest().authenticated().and()
				.addFilter(new JWTFilter(authenticationManager, userRepository))
				.authenticationManager(authenticationManager)
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		http.headers().frameOptions().disable();

		return http.build();
	}

}
