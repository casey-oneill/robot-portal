import axios from "axios";
import { Component } from "react";
import { Container, Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Loader from "./Loader";

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			isLogin: true,
			user: null,
		};
	}

	componentDidMount() {
		this.fetchUser();
	}

	fetchUser = async () => {
		const token = localStorage.getItem("token");
		const { data } = await axios.get("/api/users/info", { headers: { "Authorization": "Bearer " + token, } });
		this.setState({
			isLoading: false,
			user: data,
		});
	}

	handleLogout = () => {
		localStorage.setItem("token", "");
		this.setState({
			isLogin: false,
		});
	}

	render() {
		const { isLoading, isLogin, user } = this.state;

		if (isLoading) {
			return (
				<Container>
					<Loader />
				</Container>
			);
		}

		if (!isLogin) {
			return <Navigate to="/" />
		}

		return (
			<Navbar expand="lg border-bottom">
				<Container>
					<Navbar.Brand as={Link} to="/portal/dashboard">Robot Portal</Navbar.Brand>
					<Nav className="me-auto">
						<NavDropdown title={`Logged in as ${user.username}`}>
							<NavDropdown.ItemText><b>Username:</b> {user.username}</NavDropdown.ItemText>
							<NavDropdown.ItemText><b>ID:</b> {user.pid}</NavDropdown.ItemText>
						</NavDropdown>
					</Nav>
					<Button onClick={this.handleLogout}>Logout</Button>
				</Container>
			</Navbar>
		);
	}
}

export default Header;
