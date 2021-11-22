import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleLogin } from '../redux/login/loginActions';
import './styles/Login.css';

function Login() {
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [usernameErorr, setUsernameErorr] = useState('');

	const usernameValidRegex = /^(?=[a-zA-Z._]{3,12}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

	const handleChange = (e) => {
		setUsername(e.target.value);

		if (!usernameValidRegex.test(String(e.target.value))) {
			setUsernameErorr(
				'Username requires 3 to 12 characters, only latin letters can be used'
			);
		} else {
			setUsernameErorr('');
		}
	};

	const handleClick = () => {
		if (usernameErorr) {
			setUsernameErorr('Invalid input');
		} else {
			dispatch(handleLogin(username));
			setUsername('');
		}
	};

	return (
		<div className="login__wrapper">
			<div className="login__head">
				<h2>Please enter your name first:</h2>
			</div>
			<div className="login__body">
				<TextField
					required
					id="outlined-basic"
					label="Name is required"
					variant="outlined"
					value={username}
					onBlur={() => setUsernameErorr('')}
					onChange={handleChange}
				/>
				<Link to="/" className="login__body link">
					<Button
						variant="contained"
						disabled={!username}
						onClick={handleClick}
					>
						Next
					</Button>
				</Link>
			</div>
			<div className="login__error-wrapper">
				<p className="login__error-input"> {usernameErorr} </p>
			</div>
		</div>
	);
}

export default Login;
