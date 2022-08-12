import { Component } from "react";
import { Navigate } from "react-router-dom";

class Home extends Component {
	render() {
		return (
			<Navigate to="/accounts/login" />
		);
	}
}

export default Home;
