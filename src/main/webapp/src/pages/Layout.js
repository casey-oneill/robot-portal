import { Component } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

class Layout extends Component {
	render() {
		return (
			<div className="layout">
				<Container fluid>
					<Header />
					<Outlet />
				</Container>
			</div>
		);
	}
}

export default Layout;
