import { Component } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import LineChart from "../components/LineChart";
import RadarChart from "../components/RadarChart";
import { VscSync } from "react-icons/vsc";
import { Link } from "react-router-dom";

class Dashboard extends Component {
	render() {
		return (
			<div className="dashboard bg-light">
				<Container className="py-5">
					<Stack gap={5}>
						<Row><p className="text-muted my-0">Forgot to complete a post-maintenance survey? Find it <Link to="/portal/forms/maintenance">here</Link>.</p></Row>
						<Row>
							<Button as={Link} variant="success" className="py-3" to="/portal/diagnosis-scan"><VscSync size={24} /> Robot Scan</Button>
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
