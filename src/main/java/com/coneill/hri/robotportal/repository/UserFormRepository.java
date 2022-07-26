package com.coneill.hri.robotportal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.coneill.hri.robotportal.entity.UserForm;

public interface UserFormRepository extends CrudRepository<UserForm, Long> {

	Optional<UserForm> findById(long userFormId);

	List<UserForm> findByUserId(long userId);

	List<UserForm> findByFormId(String formId);

}
