import axios from 'axios';
import {
	GET_FORECAST_FAILURE,
	GET_FORECAST_REQUEST,
	GET_FORECAST_SUCCESS,
} from './forecastTypes';

export const getForecastRequest = () => {
	return {
		type: GET_FORECAST_REQUEST,
	};
};

export const getForecastSuccess = (response) => {
	return {
		type: GET_FORECAST_SUCCESS,
		payload: response,
	};
};

export const getForecastFailure = (error) => {
	return {
		type: GET_FORECAST_FAILURE,
		payload: error,
	};
};

export const getForecast = (selectedCityLocalStorage) => {
	return (dispatch) => {
		dispatch(getForecastRequest());

		const apiKey = '0416fc94bd8c14e8697e298e323b8846';
		const options = {
			method: 'get',
			url: `https://api.openweathermap.org/data/2.5/weather?q=${selectedCityLocalStorage}&appid=${apiKey}&units=metric`,
		};

		axios(options)
			.then((response) => {
				const forecastData = response.data;
				dispatch(getForecastSuccess(forecastData));
				console.log(forecastData);
			})
			.catch((error) => {
				const errorMessage = error?.response?.data?.message;
				dispatch(getForecastFailure(errorMessage));
				console.log(error?.response?.data);
			});
	};
};
