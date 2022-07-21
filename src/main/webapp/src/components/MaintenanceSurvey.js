import { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { MAINFORM, MAINFORM_UID } from "../constants";
import FormViewer from "./FormViewer";

class MaintenanceSurvey extends Component {

	render() {
		const prefills = {};
		prefills[MAINFORM_UID] = this.props.user.id;

		return (
			<div className="maintenance-survey">
				<Container className="my-5">
					<FormViewer url={MAINFORM} prefills={prefills} />
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	}
}

export default connect(mapStateToProps)(MaintenanceSurvey);
