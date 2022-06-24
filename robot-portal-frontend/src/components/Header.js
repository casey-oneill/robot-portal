import { Component } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {
				username: "Test User",
			}
		}
	}

	componentDidMount() {
		// TODO: Fetch current user from API
	}

	render() {
		const { user } = this.state;
		return (
			<Navbar expand="lg">
				<Container>
					<Navbar.Brand as={Link} to="/">Robot Portal</Navbar.Brand>
					<Nav>
						<Navbar.Text>{user.username}</Navbar.Text>
					</Nav>
				</Container>
			</Navbar>
		);
	}
}

export default Header;
