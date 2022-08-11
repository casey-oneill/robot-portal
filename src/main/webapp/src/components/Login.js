import axios from "axios";
import { Component } from "react";
import { Alert, Button, Card, Container, Form, Stack } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginFailure, loginSuccess } from "../redux/reducers/authSlice";

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			isError: false,
			error: "",
		}
	}

	handleSubmit = (event) => {
		const dispatch = this.props.dispatch;
		const { username, password } = this.state;

		if (username === "" || password === "") {
			this.setState({
				isError: true,
				error: "Username and password cannot be blank.",
			});
		} else {
			axios
				.post("/api/auth/login", { username, password })
				.then((result) => {
					dispatch(loginSuccess(result.data.jwtToken));
				}, (error) => {
					dispatch(loginFailure());
					this.setState({
						isError: true,
						error: "Invalid username or password.",
					});
				});
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	render() {
		if (this.props.isLoggedIn) {
			return <Navigate to="/portal/dashboard" />
		}

		return (
			<div className="login">
				<Card className="bg-light">
					<Card.Body>
						<Container>
							<Card.Title>Login</Card.Title>
							<Card.Text>Sign into your account.</Card.Text>
							<Form className="my-3">
								<Stack gap={3}>
									{this.state.isError ? <Alert variant="danger">{this.state.error}</Alert> : null}
									<Form.Group>
										<Form.Control required name="username" type="text" placeholder="Username" onChange={this.handleChange} />
									</Form.Group>
									<Form.Group>
										<Form.Control required name="password" type="password" placeholder="Password" autoComplete="on" onChange={this.handleChange} />
									</Form.Group>
								</Stack>
							</Form>
							<Button variant="success" onClick={this.handleSubmit}>Sign in</Button>
						</Container>
					</Card.Body>
				</Card>
				<Card className="my-3">
					<Card.Body>
						<Container>
							<Card.Text>Having trouble signing in? <a href="mailto:casey.oneill@unb.ca">Contact an administrator</a>.</Card.Text>
						</Container>
					</Card.Body>
				</Card>
				{/* <Card className="my-3">
					<Card.Body>
						<Container>
							<Card.Text>New to the site? <Link to="/accounts/register">Create an account</Link>.</Card.Text>
						</Container>
					</Card.Body>
				</Card> */}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
	};
}

export default connect(mapStateToProps)(Login);
