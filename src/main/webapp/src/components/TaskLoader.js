import axios from "axios";
import { faker } from "@faker-js/faker";
import { Component } from "react";
import { Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";

class TaskLoader extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			userTask: null,
			render: false,
		};
	}

	componentDidMount() {
		axios
			.get("/api/users/" + this.props.user.id + "/tasks", {
				headers: {
					"Authorization": this.props.authorization,
				}
			})
			.then((result) => {
				var filteredData = result.data.filter((ut) => {
					if (ut.complete === true) {
						return false;
					}
					return true;
				});

				if (filteredData.length !== 0) {
					this.setState({
						isLoading: false,
						userTask: filteredData[0], // User will only ever have one active task at a time
					});
				} else {
					this.setState({
						isLoading: false,
					})
				}
			}, (error) => {
				// TODO: Handle error
			});

		setTimeout(() => {
			this.setState({ render: true });
		}, faker.datatype.number({ min: 3000, max: 5000 }));
	}

	render() {
		const { isLoading, userTask, render } = this.state;

		if (isLoading || !render) {
			return (
				<div className="diagnosis-loader">
					<Container className="my-5">
						<p>Scanning robot...</p>
						<Loader />
					</Container>
				</div>
			);
		}

		if (userTask === null) {
			return (
				<div className="diagnosis-loader">
					<Container className="my-5">
						<p>Scan complete. Detected 0 issues.</p>
						<Button as={Link} variant="primary" to="/portal/dashboard">Continue</Button>
					</Container>
				</div >
			);
		}

		return (
			<div className="diagnosis-loader">
				<Container className="my-5">
					<p>Scan complete. Detected 1 issue.</p>
					<Button as={Link} variant="primary" to={`/portal/diagnosis/${userTask.id}`}>Continue</Button>
				</Container>
			</div >
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authorization: "Bearer " + state.auth.jwt,
		user: state.auth.user,
	}
}

export default connect(mapStateToProps)(TaskLoader);
