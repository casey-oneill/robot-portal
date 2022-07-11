import axios from "axios";
import { Component } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { logout } from "../redux/reducers/authSlice";

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: this.props.isLoggedIn,
			user: null,
			isLoading: true,
			isError: false,
			error: "",
		}
	}

	componentDidMount() {
		axios
		.get("/api/users/info", {
			headers: {
				"Authorization": this.props.authorization,
			}
		})
		.then((res) => {
			return res.data;
		})
		.then(
			(data) => {
				this.setState({
					user: data,
					isLoading: false,
				})
			},
			(error) => {
				this.setState({
					isError: true,
					error: "Failed to retrieve user information.",
				});
			}
		);
	}

	handleLogout = () => {
		this.props.dispatch(logout());
		this.setState({
			isLoggedIn: false,
		})
	}

	render() {
		if (!this.state.isLoggedIn) {
			return <Navigate to="/" />
		}

		if (this.state.isLoading) {
			return (<p>Loading...</p>)
		}

		console.log(this.state)
		const username = this.state.user.username;
		return (
			<Navbar expand="lg border-bottom">
				<Container>
					<Navbar.Brand as={Link} to="/portal/dashboard">Robot Portal</Navbar.Brand>
					<Nav>
						<Navbar.Text className="mx-3">{username}</Navbar.Text>
						<Button onClick={this.handleLogout}>Logout</Button>
					</Nav>
				</Container>
			</Navbar>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		authorization: "Bearer " + state.auth.jwt,
	}
}

export default connect(mapStateToProps)(Header);
