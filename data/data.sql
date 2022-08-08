-- Create data for the application

-- Create an admin user with username "user" and password "password"
INSERT INTO users(id, username, pid, password) VALUES
	((SELECT nextval('users_seq')), 'user', '1234', '$2a$10$LnxC2ldxcxd9R6.ekQ4pw.LhnHiDdF075Ol.IhBvJVU/sXfoX0rM6');

SELECT setval('users_seq', (SELECT max(id) from users), true);

-- Create tasks
INSERT INTO tasks(id, title, description, image_url) VALUES
	((SELECT nextval('tasks_seq')), 'Clean Robot Sensors', 'Use the provided cloth to wipe sensors clean.', 'https://picsum.photos/300/300');

SELECT setval('tasks_seq', (SELECT max(id) from tasks), true);

-- Create user task
INSERT INTO user_tasks(id, user_id, task_id, created_time, is_skipped, is_complete) VALUES
	((SELECT nextval('user_tasks_seq')), (select max(id) from users), (select max(id) from tasks), current_timestamp, false, false);

SELECT setval('user_tasks_seq', (SELECT max(id) from user_tasks), true);