import { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { MAINFORM_URL, MAINFORM_UID } from "../../constants";
import FormViewer from "./FormViewer";

class MaintenanceForm extends Component {

	render() {
		const prefills = {};
		prefills[MAINFORM_UID] = this.props.user.id;

		return (
			<div className="maintenance-form">
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

export default connect(mapStateToProps)(MaintenanceForm);
