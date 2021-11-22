import {
	GET_COUNTRIES_FAILURE,
	GET_COUNTRIES_REQUEST,
	GET_COUNTRIES_SUCCESS,
} from './countriesTypes';

const initialState = {
	countriesLoading: false,
	countries: [],
	getCountriesError: '',
};

export const countriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_COUNTRIES_REQUEST:
			return {
				...state,
				countriesLoading: true,
			};
		case GET_COUNTRIES_SUCCESS:
			return {
				...state,
				countriesLoading: false,
				countries: action.payload,
				getCountriesError: '',
			};
		case GET_COUNTRIES_FAILURE:
			return {
				...state,
				countriesLoading: false,
				getCountriesError: action.payload,
			};

		default:
			return state;
	}
};
