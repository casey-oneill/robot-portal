# Robot Portal

A web application created for an HRI research project.

# Test Locally

1. Download PostgreSQL software: https://www.postgresql.org/download/
2. Download `v1.0.0-beta` release JAR: https://github.com/casey-oneill/robot-portal/releases (found under the `Assets` tab)
3. Configure PostgreSQL database:
    - Create user `postgres` with password `postgres`
    - Create database `robot_portal`
5. Execute the JAR file:
    ```sh
    java -jar robot-portal-1.0.0-beta.jar
    ```
6. (Optional) Load initial data:
```sh
psql -U robot -d robot_portal -f ./data/data.sql -a
```

The application will be running at http://localhost:8080/.

# Develop Locally

1. Download PostgreSQL software: https://www.postgresql.org/download/
2. Clone `robot-portal` repository: https://github.com/casey-oneill/robot-portal
3. Configure PostgreSQL database:
    - Create user `postgres` with password `postgres`
    - Create database `robot_portal`
5. Run the Spring Boot application (back-end application):
    - From the project's root directory: `mvn spring-boot:run`
6. Run the React web application (front-end application):
    - From `/src/main/webapp/`:
    ```sh
    npm install
    npm start
    ```
7. (Optional) Load initial data:
```sh
psql -U robot -d robot_portal -f ./data/data.sql -a
```

The backend application will be running at http://localhost:8080/.
The frontend application will be running at http://localhost:3000/.
