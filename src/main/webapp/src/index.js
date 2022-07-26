import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import './index.css';
import store from "./redux/store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Home from './pages/Home';
import Register from './components/Register';
import Accounts from './pages/Accounts';
import TaskPage from './pages/TaskPage';
import TaskLoader from './components/TaskLoader';
import MaintenanceSurvey from './components/MaintenanceSurvey';
import FormPage from './pages/FormPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

const TaskPageWrapper = (props) => {
	const params = useParams();
	return (
		<TaskPage {...{ ...props, match: { params } }} />
	);
}

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path="portal" element={<Layout />}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="diagnosis-scan" element={<TaskLoader />} />
						<Route path="diagnosis-survey" element={<MaintenanceSurvey />} />
						<Route path="diagnosis">
							<Route path=":id" element={<TaskPageWrapper />} />
						</Route>
						<Route path="forms" element={<FormPage />} />
					</Route>
					<Route path="accounts" element={<Accounts />}>
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
