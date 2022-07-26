import { faker } from "@faker-js/faker";
import { Component } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "./Loader";

class TaskLoader extends Component {

	constructor(props) {
		super(props);
		this.state = {
			progress: 0,
			render: false,
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ render: true });
		}, faker.datatype.number({ min: 3000, max: 5000 }));
	}

	render() {
		const { render } = this.state;

		if (!render) {
			return (
				<div className="diagnosis-loader">
					<Container className="my-5">
						<p>Scanning robot...</p>
						<Loader />
					</Container>
				</div>
			);
		}

		return (
			<div className="diagnosis-loader">
				<Container className="my-5">
					<p>Scan complete. Detected 1 issue.</p>

					{/* FIXME: Connect to task API */}
					<Button as={Link} variant="primary" to="/portal/diagnosis/3">Continue</Button>
				</Container>
			</div>
		);
	}
}

export default TaskLoader;
