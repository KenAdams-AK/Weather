import {
	GET_FORECAST_FAILURE,
	GET_FORECAST_REQUEST,
	GET_FORECAST_SUCCESS,
} from './forecastTypes';

const initialState = {
	forecastLoading: false,
	forecastData: {},
	weatherData: [],
	getForecastError: '',
};

export const forecastReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_FORECAST_REQUEST:
			return {
				...state,
				forecastLoading: true,
			};
		case GET_FORECAST_SUCCESS:
			return {
				...state,
				forecastLoading: false,
				forecastData: action.payload,
				weatherData: action.payload.weather,
				getForecastError: '',
			};
		case GET_FORECAST_FAILURE:
			return {
				...state,
				forecastLoading: false,
				getForecastError: action.payload,
			};

		default:
			return state;
	}
};
