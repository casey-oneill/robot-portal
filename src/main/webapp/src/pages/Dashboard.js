import { Component } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import LineChart from "../components/LineChart";
import RadarChart from "../components/RadarChart";

class Dashboard extends Component {
	render() {
		return (
			<div className="dashboard bg-light">
				<Container className="py-5">
					<Stack gap={5}>
						<Row>
							<Button variant="success">Scan Robot</Button>
						</Row>
						<Row>
							<Col>
								<Card>
									<Card.Body>
										<LineChart />
									</Card.Body>
								</Card>
							</Col>
							<Col>
								<Card>
									<Card.Body>
										<LineChart />
									</Card.Body>
								</Card>
							</Col>
							<Col>
								<Card>
									<Card.Body>
										<LineChart />
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col>
								<Card>
									<Card.Body>
										<RadarChart />
									</Card.Body>
								</Card>
							</Col>
							<Col>
								<Card>
									<Card.Body>
										<RadarChart />
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Stack>
				</Container>
			</div>
		);
	}
}

export default Dashboard;
