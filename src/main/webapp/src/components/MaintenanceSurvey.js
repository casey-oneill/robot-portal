import { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { MAINFORM_URL, MAINFORM_UID, MAINFORM_ID } from "../constants";
import FormViewer from "./FormViewer";
import axios from "axios";

class MaintenanceSurvey extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
		};
	}

	componentDidMount() {
		const userForm = {
			userId: this.props.user.id,
			formId: MAINFORM_ID,
		};

		axios
			.post("/api/users/" + this.props.user.id + "/forms", userForm, {
				headers: {
					"Authorization": this.props.authorization,
				}
			})
			.then((result) => {
				this.setState({
					isLoading: false,
				});
			}, (error) => {
				// TODO: Handle error
			});
	}

	render() {
		const prefills = {};
		prefills[MAINFORM_UID] = this.props.user.id;

		return (
			<div className="maintenance-survey">
				<Container className="my-5">
					<FormViewer url={MAINFORM_URL} prefills={prefills} />
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authorization: "Bearer " + state.auth.jwt,
		user: state.auth.user,
	}
}

export default connect(mapStateToProps)(MaintenanceSurvey);
