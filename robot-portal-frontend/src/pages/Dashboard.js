import { Component } from "react";
import LineChart from "../components/LineChart";

class Dashboard extends Component {
	render() {
		return (
			<div class="dashboard bg-light">
				<LineChart />
			</div>
		);
	}
}

export default Dashboard;
