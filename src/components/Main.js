import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, HashRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from './Home';
import Login from './Login';
import AddCity from './AddCity';
import {
	initSelectedCitiy,
	setFavoritesCities,
} from '../redux/cities/citiesActions';
import { handleLogin } from '../redux/login/loginActions';

function Main() {
	const dispatch = useDispatch();

	const usernameLocalStorage = localStorage.getItem('username');
	const selectedCityLocalStorage = localStorage.getItem('selectedCity');
	const favoritesCities = localStorage.getItem('favoritesCities');

	if (usernameLocalStorage) {
		dispatch(handleLogin(usernameLocalStorage));
	}
	if (selectedCityLocalStorage) {
		dispatch(initSelectedCitiy(selectedCityLocalStorage));
	}
	if (favoritesCities) {
		const parsedCities = JSON.parse(favoritesCities);
		dispatch(setFavoritesCities(parsedCities.data));
		console.log(parsedCities);
	}

	const username = useSelector((state) => state.login.username);

	const PrivateRoute = ({ component: Component }, ...rest) => (
		<Route
			{...rest}
			render={(props) =>
				username ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/login' }} />
				)
			}
		/>
	);

	return (
		<HashRouter>
			<div className="mainScreen__wrapper">
				<Switch>
					<PrivateRoute exact path="/" component={Home} />
					<PrivateRoute exact path="/add_city" component={AddCity} />
					<Route path="/login" component={Login} />
					<Redirect from="*" to="/" />
				</Switch>
			</div>
		</HashRouter>
	);
}

export default Main;
