import axios from 'axios';
import {
	ADD_NEW_CITY,
	CLEAR_STATE,
	GET_CITIES_FAILURE,
	GET_CITIES_REQUEST,
	GET_CITIES_SUCCESS,
	INIT_SELECTED_CITY,
	REMOVE_CURRENT_CITY,
	REPLACE_SELECTED_CITY,
	SAVE_SELECTED_CITY,
	SET_FAVORITES_CITIES,
} from './citiesTypes';

export const getCitiesRequest = () => {
	return {
		type: GET_CITIES_REQUEST,
	};
};

export const getCitiesSuccess = (response) => {
	return {
		type: GET_CITIES_SUCCESS,
		payload: response,
	};
};

export const getCitiesFailure = (error) => {
	return {
		type: GET_CITIES_FAILURE,
		payload: error,
	};
};

export const saveSelectedCity = (selectedCity) => {
	return {
		type: SAVE_SELECTED_CITY,
		payload: selectedCity,
	};
};

export const replaceSelectedCity = (city) => {
	return {
		type: REPLACE_SELECTED_CITY,
		payload: city,
	};
};

export const addNewCity = (newCity) => {
	return {
		type: ADD_NEW_CITY,
		payload: newCity,
	};
};

export const removeCurrentCity = (selectedCity) => {
	return {
		type: REMOVE_CURRENT_CITY,
		payload: selectedCity,
	};
};

export const initSelectedCitiy = (selectedCity) => {
	return {
		type: INIT_SELECTED_CITY,
		payload: selectedCity,
	};
};

export const setFavoritesCities = (favoritesCities) => {
	return {
		type: SET_FAVORITES_CITIES,
		payload: favoritesCities,
	};
};

export const clearCitiesState = () => {
	return {
		type: CLEAR_STATE,
	};
};

export const getCities = (selectedCountry) => {
	return (dispatch) => {
		dispatch(getCitiesRequest());

		const options = {
			method: 'post',
			url: 'https://countriesnow.space/api/v0.1/countries/cities',
			data: {
				country: selectedCountry,
			},
		};

		axios(options)
			.then((response) => {
				const cities = response.data.data;
				dispatch(getCitiesSuccess(cities));
			})
			.catch((error) => {
				const errorMessage = error?.message;
				dispatch(getCitiesFailure(errorMessage));
				console.log(error);
			});
	};
};
