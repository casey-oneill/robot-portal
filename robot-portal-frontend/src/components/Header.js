import { Component } from "react";

class Header extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// fetch("/api/sessions")
		// 	.then((res) => res.text())
		// 	.then((text) => {
		// 		this.setState({ message: text })
		// 	});
	}

	render() {
		return (
			<p>Header text</p>
		);
	}
}

export default Header;
