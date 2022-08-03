import axios from "axios";
import { Component } from "react";
import { Alert, Button, Card, Container, Form, Stack } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			pid: "",
			password: "",
			confirmPassword: "",
			submitSuccess: false,
			isError: false,
			error: "",
		}
	}

	handleSubmit = (event) => {
		const { username, pid, password } = this.state;
		axios
			.post("/api/auth/register", { username, pid, password })
			.then((result) => {
				this.setState({
					submitSuccess: true,
				});
			}, (error) => {
				this.setState({
					isError: true,
					error: error.message,
				});
			});
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	render() {
		if (this.state.submitSuccess) {
			return (
				<div className="register">
					<Card className="bg-light mb-3">
						<Card.Body>
							<Container>
								<Card.Title className="text-success">Registration successful!</Card.Title>
								<Card.Text>Your account is ready to go! <Link to="/accounts/login">Sign in</Link>.</Card.Text>
							</Container>
						</Card.Body>
					</Card>
				</div>
			)
		}

		var isValidPassword = true;
		if (this.state.password !== "" && this.state.password !== this.state.confirmPassword) {
			isValidPassword = false;
		}

		var isFormValid = true;
		if (this.state.username === "" || this.state.pid === "" || this.state.password === "" || !isValidPassword) {
			isFormValid = false;
		}

		return (
			<div className="register">
				<Card className="bg-light mb-3">
					<Card.Body>
						<Container>
							<Card.Title>Welcome!</Card.Title>
							<Card.Text>Create a new account.</Card.Text>
							<Form className="my-3">
								<Stack gap={3}>
									{this.state.isError ? <Alert variant="danger">{this.state.error}</Alert> : null}
									{isValidPassword ? null : <Alert variant="danger">Passwords don't match.</Alert>}
									<Form.Group>
										<Form.Label>Username</Form.Label>
										<Form.Control required name="username" type="text" placeholder="Enter username" onChange={this.handleChange} />
									</Form.Group>
									<Form.Group>
										<Form.Label>Participant ID</Form.Label>
										<Form.Control required name="pid" type="text" placeholder="Enter participant ID" onChange={this.handleChange} />
										<Form.Text className="text-muted">
											4-digit code provided by researchers.
										</Form.Text>
									</Form.Group>
									<Form.Group>
										<Form.Label>Password</Form.Label>
										<Form.Control required name="password" type="password" placeholder="Password" autoComplete="on" onChange={this.handleChange} />
									</Form.Group>
									<Form.Group>
										<Form.Label>Confirm Password</Form.Label>
										<Form.Control required name="confirmPassword" type="password" placeholder="Confirm password" autoComplete="on" onChange={this.handleChange} />
									</Form.Group>
								</Stack>
							</Form>
							<Button variant="success" onClick={this.handleSubmit} disabled={!isFormValid}>Sign up</Button>
						</Container>
					</Card.Body>
				</Card>
				<Card>
					<Card.Body>
						<Container>
							<Card.Text>Already have an account? <Link to="/accounts/login">Sign in</Link>.</Card.Text>
						</Container>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

export default Register;
