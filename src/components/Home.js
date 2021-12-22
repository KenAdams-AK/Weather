import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	clearCitiesState,
	removeCurrentCity,
} from '../redux/cities/citiesActions';
import { getForecast } from '../redux/forecast/forecastActions';
import { handleLogout } from '../redux/login/loginActions';
import Forecast from './Forecast';
import SelectCity from './SelectCity';
import './styles/Home.css';

function Home() {
	const dispatch = useDispatch();
	const username = useSelector((state) => state.login.username);
	const selectedCity = useSelector((state) => state.cities.selectedCity);
	const forecast = useSelector((state) => state.forecast);

	useEffect(() => {
		if (selectedCity) {
			dispatch(getForecast(selectedCity));
		}
	}, [selectedCity]);

	const handleClick = () => {
		dispatch(handleLogout());
		dispatch(clearCitiesState());
	};

	return (
		<div className="home__wrapper">
			<header className="home__header">
				<div className="home__header-greeting">
					<div className="home__header-logo">
						<Link to="/" className="home__header-logo link">
							<h1>Forecast</h1>
						</Link>
					</div>
					<div className="home__header-title">
						<h1>Hello, {username}!</h1>
					</div>
					<div className="home__header-logOut">
						<Button variant="contained" onClick={handleClick}>
							Logout
						</Button>
					</div>
				</div>
				<div className="home__header-buttons">
					<Link to="/add_city">
						<div className="home__header-addNewCity" style={{ margin: '3px' }}>
							<Button variant="contained">Add new city</Button>
						</div>
					</Link>

					<div className="home__header-selectCity" style={{ margin: '3px' }}>
						<SelectCity />
					</div>

					<div
						className="home__header-removeCurrentCity"
						style={{ margin: '3px' }}
					>
						<Button
							variant="contained"
							onClick={() => {
								dispatch(removeCurrentCity(selectedCity));
								console.log(selectedCity);
							}}
						>
							Remove current city
						</Button>
					</div>
				</div>
			</header>
			<main className="home__main">
				{!selectedCity ? (
					<div className="home__main-addCity-button-wrapper">
						<h2>Please press the button to select a city:</h2>
						<Link to="/add_city" className="login__body link">
							<Button variant="contained">Select city</Button>
						</Link>
					</div>
				) : (
					<div className="home__main-forecast-wrapper">
						{forecast.forecastLoading ? (
							<div className="home__main-forecast-loading">
								<h3>Loading...</h3>
							</div>
						) : forecast.getForecastError ? (
							<div className="home__main-forecast-error">
								Loading forecast Error: {forecast.getForecastError}
							</div>
						) : (
							<Forecast />
						)}
					</div>
				)}
			</main>
		</div>
	);
}

export default Home;
