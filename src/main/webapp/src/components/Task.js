import axios from "axios";
import { connect } from "react-redux";
import { Component } from "react";
import { Button, Card } from "react-bootstrap";

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
		if (this.state.userTask.taskId !== null) {
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
		var userTask = this.state.userTask;
		userTask.isComplete = isComplete;
		userTask.isSkipped = isSkipped;
		axios
		.put("/api/users/tasks", {
			userTask,
		},
		{
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

	handleSkip = () => {
		this.submitPutUserTask(true, true);
	}

	handleComplete = () => {
		this.submitPutUserTask(true, false);
	}

	render() {
		const { task, isLoading } = this.state;
		if (isLoading) {
			// FIXME: Use application loader
			return <p>Loading...</p>
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
						<Button variant="primary" onClick={this.handleSkip}>Skip</Button>
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
	}
}

export default connect(mapStateToProps)(Task);
