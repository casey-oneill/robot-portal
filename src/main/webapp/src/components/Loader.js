import { Component } from "react";
import { Spinner } from "react-bootstrap";

class Loader extends Component {
	render() {
		return (
			<Spinner animation="border" role="status" variant="primary">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		);
	}
}

export default Loader;
