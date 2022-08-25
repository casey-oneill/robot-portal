import { Component } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import axios from "axios";
import Loader from "../Loader";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

class LineChart extends Component {

	constructor(props) {
		super(props);
		this.state = {
			options: {
				responsive: true,
			},
			data: null,
			scheme: [],
			isLoaded: false,
		};
	}

	componentDidMount() {
		this.randomData();
	}

	componentDidUpdate() {
		if (this.state.scheme.length > 0 && this.state.isLoaded === false) {
			this.randomData();
		}
	}

	randomData = () => {
		const n = 8;
		const scheme = this.state.scheme;
		if (scheme.length <= 0) {
			const colourSeed = faker.color.rgb({ format: "css" });
			axios.get("https://www.thecolorapi.com/scheme?rgb=" + colourSeed + "&mode=analogic&count=" + n + "&format=json")
				.then((result) => {
					this.setState({ scheme: result.data.colors });
				}, (error) => {
					// TODO: Handle error
				});
		} else {
			var labels = [];
			var datasets = [];
			for (var i = 0; i < n; i++) {
				const colour = this.state.scheme[i].rgb.value;
				const acolour = "rgba" + colour.substring(3, colour.length - 1) + ", 0.5)";
				datasets.push({
					label: faker.random.alpha({ count: 5, casing: 'upper', bannedChars: ["A"] }),
					data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
					borderColor: colour,
					backgroundColor: acolour,
				});

				labels.push(faker.random.alpha({ count: 3, casing: 'upper', bannedChars: ["A"] }));
			}

			this.setState({
				data: {
					labels,
					datasets: datasets,
				},
				isLoaded: true,
			});

			setTimeout(() => {
				this.randomData();
			}, faker.datatype.number({ min: 1000, max: 3000 }));
		}
	}

	render() {
		const { options, data, isLoaded } = this.state;
		if (!isLoaded) {
			return (
				<Loader />
			);
		}

		return (
			<Line options={options} data={data} />
		);
	}
}

export default LineChart;
