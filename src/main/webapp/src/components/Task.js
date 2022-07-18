import axios from "axios";
import { connect } from "react-redux";
import { Component } from "react";
import { Button, Card } from "react-bootstrap";
import Loader from "./Loader";
import { FaCheckCircle } from "react-icons/fa";

class Task extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userTask: null,
			task: null,
			isLoading: true,
		}
	}

	componentDidMount = () => {
		axios
			.get("/api/users/tasks/" + this.props.userTaskId, {
				headers: {
					"Authorization": this.props.authorization,
				}
			})
			.then((res) => {
				return res.data;
			})
			.then(
				(data) => {
					this.setState({
						userTask: data,
					});
				},
				(error) => {
					// TODO: Handle error
				}
			);
	}

	componentDidUpdate = () => {
		if (this.state.userTask !== null && this.state.userTask.taskId !== null && this.state.task === null) {
			axios
				.get("/api/tasks/" + this.state.userTask.taskId, {
					headers: {
						"Authorization": this.props.authorization,
					}
				})
				.then((res) => {
					return res.data;
				})
				.then(
					(data) => {
						this.setState({
							task: data,
							isLoading: false,
						})
					},
					(error) => {
						// TODO: Handle error
					}
				);
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
			.then((res) => {
				return res.data;
			})
			.then(
				(data) => {
					console.log(data)
					this.setState({
						userTask: data,
						isLoading: false,
					});
				},
				(error) => {
					// TODO: Handle error
				}
			);
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
				<div className="task">
					<Card>
						<Card.Body>
							<Card.Title>
								{task.title}
							</Card.Title>
							<Card.Body className="mx-0 px-0 text-muted">
								<FaCheckCircle className="text-success" /> Task Complete.
							</Card.Body>
						</Card.Body>
					</Card>
				</div>
			);
		}

		return (
			<div className="task">
				<Card>
					<Card.Body>
						<Card.Title>
							{task.title}
						</Card.Title>
						<Card.Body className="mx-0 px-0">
							{task.description}
						</Card.Body>
					</Card.Body>
					<Card.Img variant="bottom" src={task.imageUrl} />
					<Card.Footer className="p-3">
						<Button variant="primary" onClick={this.handleSkip}>Skip</Button>{' '}
						<Button variant="success" onClick={this.handleComplete}>Complete</Button>
					</Card.Footer>
				</Card>
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

export default connect(mapStateToProps)(Task);
