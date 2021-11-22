import { HANDLE_LOGIN, HANDLE_LOGOUT } from './loginTypes';

const initialState = {
	username: '',
};

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case HANDLE_LOGIN:
			localStorage.setItem('username', action.payload);
			return {
				username: action.payload,
			};
		case HANDLE_LOGOUT:
			localStorage.removeItem('username');
			return {
				initialState,
			};

		default:
			return state;
	}
};

export default loginReducer;
