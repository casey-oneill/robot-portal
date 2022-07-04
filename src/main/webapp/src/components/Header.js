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
		}
	}

	handleLogout = () => {
		this.props.dispatch(logout());
		this.setState({
			isLoggedIn: false,
		})
	}

	render() {
		// FIXME: Uncomment for final build
		// if (!this.state.isLoggedIn) {
		// 	return <Navigate to="/" />
		// }

		const username = this.props.user.username;
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
		user: {
			username: "Test User" // TODO: Add user data to store
		},
	}
}

export default connect(mapStateToProps)(Header);
