import { Component } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

class Layout extends Component {
	render() {
		return (
			<>
				<Header />
				<Outlet />
				<Footer />
			</>
		);
	}
}

export default Layout;
