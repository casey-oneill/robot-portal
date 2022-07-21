import { Component } from "react";
import { Card } from "react-bootstrap";

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
				<Card>
					<Card.Body>
						<Card.Title>Please complete the following form.</Card.Title>
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
