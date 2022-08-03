import { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class FormViewer extends Component {

	render() {
		var { url, prefills } = this.props;
		if (prefills !== undefined && prefills !== null) {
			Object.entries(prefills).forEach(([key, value]) => {
				url += "&" + key + "=" + value;
			});
		}

		return (
			<div className="form-viewer text-center">
				<Card className="bg-light">
					<Card.Body>
						Please complete the following form. After submitting the form, click <Link to="/portal/dashboard">here</Link> to proceed to dashboard.
					</Card.Body>
				</Card>
				<Card className="my-3">
					<Card.Body>
						<Card.Text>
							<iframe src={url} title="formFrame" width="700" height="600">Loading…</iframe>
						</Card.Text>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

export default FormViewer;
