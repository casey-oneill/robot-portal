import axios from "axios";
import { Component } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Task from "../components/Task";

class TaskPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			userTask: null,
			task: null,
		};
	}

	componentDidMount = () => {
		this.fetchTask();
	}

	fetchUserTask = async () => {
		const token = localStorage.getItem("token");
		const { data } = await axios.get("/api/users/tasks/" + this.props.match.params.id, { headers: { "Authorization": "Bearer " + token, } });
		return data;
	}

	fetchTask = async () => {
		const userTask = await this.fetchUserTask();
		const token = localStorage.getItem("token");
		const { data } = await axios.get("/api/tasks/" + userTask.taskId, { headers: { "Authorization": "Bearer " + token, } });

		this.setState({
			isLoading: false,
			userTask: userTask,
			task: data,
		});
	}

	submitPutUserTask = async (isComplete, isSkipped) => {
		this.setState({
			isLoading: true,
		});

		const updatedUserTask = {
			id: this.state.userTask.id,
			complete: isComplete,
			skipped: isSkipped,
		}

		const token = localStorage.getItem("token");
		const { data } = await axios.put("/api/users/" + this.state.userTask.userId + "/tasks", updatedUserTask, { headers: { "Authorization": "Bearer " + token } });

		this.setState({
			isLoading: false,
			userTask: data,
		});
	}

	handleSkip = () => {
		this.submitPutUserTask(true, true);
	}

	handleComplete = () => {
		this.submitPutUserTask(true, false);
	}

	render() {
		const { isLoading, userTask, task } = this.state;

		if (isLoading) {
			return <Loader />
		}

		if (userTask.complete) {
			return (
				<div className="task-page">
					<Container className="my-5">
						<Card>
							<Card.Body>
								<Card.Body className="mx-0 px-0 text-muted">
									<FaCheckCircle className="text-success" /> Task Complete.
								</Card.Body>
							</Card.Body>
						</Card>
						<Card className="my-3 bg-light">
							<Card.Body>
								<Container>
									<Button as={Link} variant="primary" to="/portal/forms/maintenance">Continue</Button>{' '}
								</Container>
							</Card.Body>
						</Card>
					</Container>
				</div>
			);
		}

		return (
			<div className="task-page">
				<Container className="my-5">
					<Task {...task} />
					<Card className="my-3 bg-light">
						<Card.Body>
							<Container>
								<Button variant="primary" onClick={this.handleSkip}>Skip</Button>{' '}
								<Button variant="success" onClick={this.handleComplete}>Complete</Button>
							</Container>
						</Card.Body>
					</Card>
				</Container>
			</div>
		)
	}
}

export default TaskPage;
