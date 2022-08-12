import axios from "axios";
import { Component } from "react";
import { Container } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";

class Layout extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			isLogin: false,
		}
	}

	componentDidMount() {
		const token = localStorage.getItem("token");
		axios.get("/api/users/info", { headers: { "Authorization": "Bearer " + token, } })
			.then((response) => {
				this.setState({
					isLoading: false,
					isLogin: true,
				})
			}, (error) => {
				this.setState({
					isLoading: false,
					isLogin: false,
				});
			});
	}

	render() {
		const { isLoading, isLogin } = this.state;

		if (isLoading) {
			return <Loader />
		}

		if (!isLogin) {
			return <Navigate to="/" />
		}

		return (
			<div className="layout">
				<Container fluid className="px-0">
					<Header />
					<Outlet />
				</Container>
			</div>
		);
	}
}

export default Layout;
