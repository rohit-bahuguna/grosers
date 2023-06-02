import axios from 'axios';
const baseUrl = '/api/auth';

export const signInService = async userData => {
	const url = `/api/auth/login`;
	const { email, password } = userData;

	return await axios.post(url, {
		email,
		password
	});
};

export const signupService = async userData => {
	const url = `/api/auth/signup`;
	return await axios.post(url, userData);
};

export const getProductsService = async () => {
	const url = `/api/products`;

	return await axios.get(url);
};
