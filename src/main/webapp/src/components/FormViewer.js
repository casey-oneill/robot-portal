import { Component } from "react";
import { Card } from "react-bootstrap";

class FormViewer extends Component {

	constructor(props) {
		super(props);
		this.props = {
			url: this.props.url,
		};
	}

	render() {
		const { props } = this.state;
		return (
			<div className="form-viewer text-center">
				<Card>
					<Card.Body>
                    	<Card.Title>Please complete the following form.</Card.Title>
						<Card.Text>
							<iframe src={props} width="640" height="554" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
						</Card.Text>
					</Card.Body>
                </Card>
			</div>
		);
	}
}

export default FormViewer;
