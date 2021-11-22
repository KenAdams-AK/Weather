import axios from 'axios';
import {
	GET_COUNTRIES_FAILURE,
	GET_COUNTRIES_REQUEST,
	GET_COUNTRIES_SUCCESS,
} from './countriesTypes';

export const getCountriesRequest = () => {
	return {
		type: GET_COUNTRIES_REQUEST,
	};
};

export const getCountriesSuccess = (response) => {
	return {
		type: GET_COUNTRIES_SUCCESS,
		payload: response,
	};
};

export const getCountriesFailure = (error) => {
	return {
		type: GET_COUNTRIES_FAILURE,
		payload: error,
	};
};

export const getCountries = () => {
	return (dispatch) => {
		dispatch(getCountriesRequest());

		const options = {
			method: 'get',
			url: 'https://countriesnow.space/api/v0.1/countries/flag/images',
		};

		axios(options)
			.then((response) => {
				const countries = response.data.data;
				dispatch(getCountriesSuccess(countries));
				console.log(countries);
			})
			.catch((error) => {
				const errorMessage = error?.message;
				dispatch(getCountriesFailure(errorMessage));
				console.log('Error: ', errorMessage);
			});
	};
};
