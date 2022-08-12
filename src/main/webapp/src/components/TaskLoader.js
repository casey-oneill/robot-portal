import axios from "axios";
import { faker } from "@faker-js/faker";
import { Component } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "./Loader";

class TaskLoader extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			userTasks: [],
			render: false,
		};
	}

	componentDidMount() {
		this.fetchUserTask();

		setTimeout(() => {
			this.setState({ render: true });
		}, faker.datatype.number({ min: 2000, max: 3000 }));
	}

	fetchUser = async () => {
		const token = localStorage.getItem("token");
		const { data } = await axios.get("/api/users/info", { headers: { "Authorization": "Bearer " + token, } });
		return data;
	}

	fetchUserTask = async () => {
		const token = localStorage.getItem("token");
		const user = await this.fetchUser();
		const { data } = await axios.get("/api/users/" + user.id + "/tasks", { headers: { "Authorization": "Bearer " + token, } });

		var filteredData = data.filter((ut) => {
			return !ut.complete;
		});

		this.setState({
			isLoading: false,
			userTasks: filteredData,
		});
	}

	render() {
		const { isLoading, userTasks, render } = this.state;

		if (isLoading || !render) {
			return (
				<div className="tasks-loader">
					<Container className="my-5">
						<p>Scanning robot...</p>
						<Loader />
					</Container>
				</div>
			);
		}

		if (userTasks.length === 0) {
			return (
				<div className="tasks-loader">
					<Container className="my-5">
						<p>Scan complete. No tasks found.</p>
						<Button as={Link} variant="primary" to="/portal/dashboard">Continue</Button>
					</Container>
				</div >
			);
		}

		return (
			<div className="tasks-loader">
				<Container className="my-5">
					<p>Scan complete. Detected a task.</p>
					<Button as={Link} variant="primary" to={`/portal/tasks/${userTasks[0].id}`}>Continue</Button>
				</Container>
			</div >
		);
	}
}

export default TaskLoader;
