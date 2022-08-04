package com.coneill.hri.robotportal.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "user_tasks")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserTask {

	@Id
	@SequenceGenerator(name = "user_tasks_seq", sequenceName = "user_tasks_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_tasks_seq")
	private long id;
	private long userId;
	private long taskId;
	private boolean isComplete;
	private boolean isSkipped;
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdTime;
	@Temporal(TemporalType.TIMESTAMP)
	private Date completedTime;

}
