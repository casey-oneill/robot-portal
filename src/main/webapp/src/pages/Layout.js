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
		}
	}

	componentDidMount() {
		if (this.props.user === null)
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
						this.props.dispatch(updateUser(data))
						this.setState({
							isLoading: false,
						})
					},
					(error) => {
						// TODO: Handle error
					}
				);
	}

	render() {
		if (!this.props.isLoggedIn) {
			return <Navigate to="/" />
		}

		if (this.state.isLoading) {
			return <Loader />
		}

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

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		authorization: "Bearer " + state.auth.jwt,
		user: state.auth.user,
	}
}

export default connect(mapStateToProps)(Layout);
