import { Component } from "react"
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class NotFound extends Component {

	render() {
		return (
			<div className="not-found-page">
				<Container className="my-5 text-center">
					<h1 className="display-1 fw-bold">404</h1>
					<p className="fs-3"><span className="text-danger">Oops!</span> That page doesn't exist.</p>
					<p className="lead">Sorry, the page you were looking for could not be found.</p>
					<Link to="/" className="btn btn-primary">Go Home</Link>
				</Container>
			</div>
		);
	}
}

export default NotFound;