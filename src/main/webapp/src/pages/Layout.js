import axios from "axios";
import { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { updateUser } from "../redux/reducers/authSlice";

class Layout extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			isError: false,
		}
	}

	componentDidMount() {
		if (this.props.isLoggedIn && this.props.user === null)
			axios
				.get("/api/users/info", {
					headers: {
						"Authorization": this.props.authorization,
					}
				})
				.then((response) => {
					this.props.dispatch(updateUser(response.data))
					this.setState({
						isLoading: false,
					})
				}, (error) => {
					this.setState({
						isLoading: false,
						isError: true,
					});
				});
	}

	render() {
		if (!this.props.isLoggedIn || this.state.isError) {
			return <Navigate to="/" />
		}

		if (this.state.isLoading) {
			return <Loader />
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

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		authorization: "Bearer " + state.auth.jwt,
		user: state.auth.user,
	}
}

export default connect(mapStateToProps)(Layout);
