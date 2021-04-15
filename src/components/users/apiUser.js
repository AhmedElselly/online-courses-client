import axios from 'axios';
const url = 'https://online-courses-backend.herokuapp.com';

export const login = async (email, password) => {
	const res = await axios.post(`${url}/login`, {email, password});
	return res;
}

export const register = async (email, firstName, lastName, teacher, password) => {
	const res = await axios.post(`${url}/register`, {email, password, firstName, lastName, teacher});
	return res;
}

export const logout = async (next) => {
	if(window !== undefined){
		localStorage.removeItem('token');
	}

	const res = await axios.get(`${url}/logout`);
	next();
	return res;
}

export const authenticate = (token, next) => {
	if(window !== undefined){
		localStorage.setItem('token', JSON.stringify(token));
		next();
	}
}

export const isAuthenticated = () => {
	if(window !== undefined){
		return JSON.parse(localStorage.getItem('token'));
	} else {
		console.log('no token found')
	}
}