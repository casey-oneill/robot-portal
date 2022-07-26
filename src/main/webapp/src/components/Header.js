import { Component } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/reducers/authSlice";

class Header extends Component {

	handleLogout = () => {
		this.props.dispatch(logout());
	}

	render() {
		const username = this.props.user.username;
		return (
			<Navbar expand="lg border-bottom">
				<Container>
					<Navbar.Brand as={Link} to="/portal/dashboard">Robot Portal</Navbar.Brand>
					<Nav>
						<Nav.Link as={Link} to="/portal/forms">Forms</Nav.Link>
						<Navbar.Text className="mx-3">Welcome, {username}</Navbar.Text>
						<Button onClick={this.handleLogout}>Logout</Button>
					</Nav>
				</Container>
			</Navbar>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	}
}

export default connect(mapStateToProps)(Header);
