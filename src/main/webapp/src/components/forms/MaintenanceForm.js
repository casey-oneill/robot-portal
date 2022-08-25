import axios from "axios";
import { Component } from "react";
import { Container } from "react-bootstrap";
import { MAINFORM_URL, MAINFORM_UID } from "../../constants";
import Loader from "../Loader";
import FormViewer from "./FormViewer";

class MaintenanceForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			user: null,
		};
	}

	componentDidMount() {
		this.fetchUser();
	}

	fetchUser = async () => {
		const token = localStorage.getItem("token");
		const { data } = await axios.get("/api/users/info", { headers: { "Authorization": "Bearer " + token, } });
		this.setState({
			isLoading: false,
			user: data,
		});
	}

	render() {
		const { isLoading, user } = this.state;

		if (isLoading) {
			return <Loader />
		}

		const prefills = {};
		prefills[MAINFORM_UID] = user.pid;

		return (
			<div className="maintenance-form">
				<Container className="my-5">
					<FormViewer url={MAINFORM_URL} prefills={prefills} />
				</Container>
			</div>
		);
	}
}

export default MaintenanceForm;
