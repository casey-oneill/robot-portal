import { Component } from "react";
import { Card } from "react-bootstrap";

class Task extends Component {

	render() {
		return (
			<div className="task">
				<Card>
					<Card.Body>
						<Card.Title>
							{this.props.title}
						</Card.Title>
						<Card.Body className="mx-0 px-0">
							{this.props.description}
						</Card.Body>
					</Card.Body>
					<Card.Img variant="bottom" src={this.props.imageUrl} />
				</Card>
			</div>
		);
	}
}

export default Task;
