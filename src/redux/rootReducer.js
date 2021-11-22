import { combineReducers } from 'redux';
import { citiesReducer } from './cities/citiesReducer';
import { countriesReducer } from './counties/countriesReducer';
import { forecastReducer } from './forecast/forecastReducer';
import loginReducer from './login/loginReducer';

const rootReducer = combineReducers({
	login: loginReducer,
	countries: countriesReducer,
	cities: citiesReducer,
	forecast: forecastReducer,
});

export default rootReducer;
