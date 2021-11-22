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

const initialState = {
	citiesLoading: false,
	cities: [],
	getCitiesError: '',
	selectedCity: '',
	favoritesCities: [],
};

export const citiesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CITIES_REQUEST:
			return {
				...state,
				citiesLoading: true,
			};
		case GET_CITIES_SUCCESS:
			return {
				...state,
				citiesLoading: false,
				cities: action.payload,
				getCitiesError: '',
			};
		case GET_CITIES_FAILURE:
			return {
				...state,
				citiesLoading: false,
				getCitiesError: action.payload,
			};

		case SAVE_SELECTED_CITY:
			localStorage.setItem('selectedCity', action.payload);

			if (state?.favoritesCities?.includes(action.payload)) {
				return {
					...state,
					selectedCity: action.payload,
				};
			} else {
				localStorage.setItem(
					'favoritesCities',
					JSON.stringify({ data: [action.payload] })
				);
				return {
					...state,
					selectedCity: action.payload,
					favoritesCities: [action.payload],
				};
			}

		case REPLACE_SELECTED_CITY:
			localStorage.setItem('selectedCity', action.payload);
			return {
				...state,
				selectedCity: action.payload,
			};

		case ADD_NEW_CITY:
			if (state.favoritesCities.includes(action.payload)) {
				return {
					...state,
				};
			} else {
				localStorage.setItem(
					'favoritesCities',
					JSON.stringify({
						data: [...state.favoritesCities, action.payload],
					})
				);
				return {
					...state,
					favoritesCities: [...state.favoritesCities, action.payload],
				};
			}

		case REMOVE_CURRENT_CITY:
			localStorage.removeItem('selectedCity');

			const newFavoritesCities = [...state.favoritesCities].filter(
				(city) => city !== action.payload
			);
			localStorage.setItem(
				'favoritesCities',
				JSON.stringify({ data: newFavoritesCities })
			);

			const newSelectedCity = newFavoritesCities.length
				? newFavoritesCities[0]
				: '';
			localStorage.setItem('selectedCity', newSelectedCity);

			return {
				...state,
				selectedCity: newSelectedCity,
				favoritesCities: newFavoritesCities,
			};

		case INIT_SELECTED_CITY:
			return {
				...state,
				selectedCity: action.payload,
			};

		case SET_FAVORITES_CITIES:
			return {
				...state,
				favoritesCities: action.payload,
			};

		case CLEAR_STATE:
			localStorage.clear();
			return {
				initialState,
			};

		default:
			return state;
	}
};
