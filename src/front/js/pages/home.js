import "../../styles/home.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = ({ onLoginSuccess }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (event, isRegistering) => {
		event.preventDefault();
		const url = isRegistering
			? 'https://super-space-couscous-v6g4wwwq77gvc6w7q-3001.app.github.dev/api/register'
			: 'https://super-space-couscous-v6g4wwwq77gvc6w7q-3001.app.github.dev/api/login';
		const method = 'POST';
		const body = JSON.stringify({ email, password });

		try {
			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
				},
				body,
			});

			const data = await response.json();

			if (response.ok) {
				if (!isRegistering) {
					onLoginSuccess(data.access_token, email);
					navigate('/MainPage');
				} else {
					alert('User registered successfully!');
					setShowModal(false);
				}
			} else {
				alert(data.message || 'Something went wrong.');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred. Please try again later.');
		}
	};

	return (
		<div className="container mt-5">
			<h1 className="text-center fw-bold text-primary">Login</h1>
			<form className="mt-4 custom-form" onSubmit={(e) => handleSubmit(e, false)}>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email Address</label>
					<input
						type="email"
						className="form-control"
						id="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">Password</label>
					<input
						type="password"
						className="form-control"
						id="password"
						placeholder="Enter your password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary w-100">Login</button>
				<button
					className="btn btn-outline-primary mt-3 w-100"
					onClick={() => setShowModal(true)}
				>
					Create Account
				</button>
			</form>

			{showModal && (
				<div className="modal show d-block" tabIndex="-1">
					<div className="modal-dialog">
						<div className="modal-content custom-modal">
							<div className="modal-header custom-modal-header">
								<h5 className="modal-title">Create an Account</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setShowModal(false)}
								></button>
							</div>
							<div className="modal-body">
								<form onSubmit={(e) => handleSubmit(e, true)}>
									<div className="mb-3">
										<label htmlFor="modalEmail" className="form-label">Email Address</label>
										<input
											type="email"
											className="form-control"
											id="modalEmail"
											placeholder="Enter your email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="modalPassword" className="form-label">Password</label>
										<input
											type="password"
											className="form-control"
											id="modalPassword"
											placeholder="Create a password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
									</div>
									<button type="submit" className="btn btn-primary w-100">Register</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};