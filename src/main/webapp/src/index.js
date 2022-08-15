import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import TaskPage from './pages/TaskPage';
import TaskLoader from './components/TaskLoader';
import MaintenanceForm from './components/forms/MaintenanceForm';
import NotFound from './pages/errors/NotFound';
import RegisterPage from './pages/RegisterPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

const TaskPageWrapper = (props) => {
	const params = useParams();
	return (
		<TaskPage {...{ ...props, match: { params } }} />
	);
}

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path="portal" element={<Layout />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="tasks" element={<TaskLoader />} />
					<Route path="tasks">
						<Route path=":id" element={<TaskPageWrapper />} />
					</Route>
					<Route path="forms">
						<Route path="maintenance" element={<MaintenanceForm />} />
					</Route>
				</Route>
				<Route path="login" element={<LoginPage />} />
				{/* <Route path="register" element={<RegisterPage />} /> */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
