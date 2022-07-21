import axios from "axios";
import { Component } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Task from "../components/Task";

class TaskPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userTask: null,
			task: null,
			isLoading: true,
		};
	}

	componentDidMount = () => {
		// Get userTask information
		axios
			.get("/api/users/tasks/" + this.props.match.params.id, {
				headers: {
					"Authorization": this.props.authorization,
				}
			})
			.then((result) => {
				this.setState({
					userTask: result.data,
				});
			}, (error) => {
				// TODO: Handle error
			});
	}

	componentDidUpdate = () => {
		if (this.state.userTask !== null && this.state.task === null) {
			axios
				.get("/api/tasks/" + this.state.userTask.taskId, {
					headers: {
						"Authorization": this.props.authorization,
					}
				})
				.then((result) => {
					this.setState({
						task: result.data,
						isLoading: false,
					})
				}, (error) => {
					// TODO: Handle error
				});
		}
	}

	submitPutUserTask = (isComplete, isSkipped) => {
		this.setState({
			isLoading: true,
		});

		const userTask = {
			id: this.state.userTask.id,
			complete: isComplete,
			skipped: isSkipped,
		}

		axios
			.put("/api/users/" + this.props.user.id + "/tasks", userTask, {
				headers: {
					"Authorization": this.props.authorization,
				}
			})
			.then((result) => {
				this.setState({
					userTask: result.data,
					isLoading: false,
				});
			}, (error) => {
				// TODO: Handle error
			});
	}

	handleSkip = () => {
		this.submitPutUserTask(true, true);
	}

	handleComplete = () => {
		this.submitPutUserTask(true, false);
	}

	render() {
		const { userTask, task, isLoading } = this.state;

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
									<Button as={Link} variant="primary" to="/portal/diagnosis-survey">Continue</Button>{' '}
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

const mapStateToProps = (state) => {
	return {
		authorization: "Bearer " + state.auth.jwt,
		user: state.auth.user,
	}
}

export default connect(mapStateToProps)(TaskPage);
