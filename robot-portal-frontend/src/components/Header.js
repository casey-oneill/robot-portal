import { Component } from "react";

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			message: "",
		}
	}

	componentDidMount() {
		fetch("/api/sessions")
			.then((res) => res.text())
			.then((text) => {
				this.setState({ message: text })
			});
	}

	render() {
		const { message } = this.state;
		return (
			<p>{message}</p>
		);
	}
}

export default Header;
