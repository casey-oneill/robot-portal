import { Component } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

class Accounts extends Component {
	render() {
		return (
			<div className="accounts">
				<h1 className="text-center display-3 my-5">Robot Portal</h1>
				<Container>
					<Outlet />
				</Container>
			</div>
		);
	}
}

export default Accounts;
