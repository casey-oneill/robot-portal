import { Component } from "react";
import { Container } from "react-bootstrap";
import { REGFORM_ID, MAINFORM_ID } from "../constants";

const path = require("path");
const google = require("@googleapis/forms");
const {
	authenticate,
} = require("@google-cloud/local-auth");

class FormPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			forms: [],
		};
	}

	componentDidMount() {
		this.fetchForms(REGFORM_ID);
		this.fetchForms(MAINFORM_ID);
	}

	fetchForms = async (formID) => {
		const auth = await authenticate({
			keyfilePath: path.join(__dirname, "credentials.json"),
			scopes: "https://www.googleapis.com/auth/forms.responses.readonly",
		});

		const forms = google.forms({
			version: "v1",
			auth: auth,
		});

		const res = await forms.forms.responses.list({
			formId: formID,
		});

		console.log(res);

		// this.setState({
		// 	isLoading: false,
		// 	forms: [],
		// });
	}

	render() {
		return (
			<div className="form-page">
				<Container>
					Form Page!
				</Container>
			</div>
		);
	}
}

export default FormPage;
