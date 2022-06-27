import axios from "axios";
import { Component } from "react";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginFailure, loginSuccess } from "../redux/reducers/authSlice";

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
		}
	}

	handleSubmit = (event) => {
		const dispatch = this.props.dispatch;
		const { username, password } = this.state;

		axios
			.post("/api/auth/login", { username, password })
			.then((res) => {
				return res.data;
			})
			.then(
				(data) => {
					dispatch(loginSuccess());
				},
				(error) => {
					dispatch(loginFailure());
				}
			);
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
				<Card className="bg-light mb-3">
					<Card.Body>
						<Container>
							<Card.Title>Login</Card.Title>
							<Card.Text>Sign into your account.</Card.Text>
							<Form className="my-3">
								<Stack gap={3}>
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
				<Card>
					<Card.Body>
						<Container>
							<Card.Text>New to the site? <Link to="/accounts/register">Create an account</Link>.</Card.Text>
						</Container>
					</Card.Body>
				</Card>
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
